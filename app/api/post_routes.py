from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required

from ..models.db import db
from ..models.post import Post
from ..models.comment import Comment
from ..models.user import User
from ..forms.post_form import PostForm
from ..forms.comment_form import CommentForm

post_routes = Blueprint('post', __name__)

# Get All posts
@post_routes.route("/all")
def get_all_posts():
  all_posts = Post.query.all()
  print(all_posts)

  all_posts_json = [post.to_dict() for post in all_posts]
  return jsonify(all_posts_json)

# Get all posts for the logged in user's subscriptions (Home)
@post_routes.route("/home")
def get_all_posts_for_user():
  subscriptions = current_user.subscription
  user_subranddits = [subscription.subranddit for subscription in subscriptions]
  all_posts = Post.query.all()
  all_posts = [post for post in all_posts if post.subranddit in user_subranddits]


  all_posts_json = [post.to_dict() for post in all_posts]
  return jsonify(all_posts_json)

# Get Details of a single post
@post_routes.route("/<int:post_id>")
def post_details(post_id):
  post = Post.query.get_or_404(post_id)

  if not post:
    return {"message": "Post does not exist", 'statusCode': 404}

  return post.to_dict()

# Create a post
@post_routes.route("/", methods=["POST"])
@login_required
def create_post():
  form = PostForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():

    new_post = Post(
      post_title = form.data["post_title"],
      img_url = form.data['img_url'],
      post_text = form.data["post_text"],
      user_id = current_user.id,
      subranddit_id  = form.data["subranddit_id"],
    )
    db.session.add(new_post)
    db.session.commit()

    new_post = new_post.to_dict()
    return new_post
  else: # error handling
    error_response = {
      'errors': form.errors
    }
    return jsonify(error_response), 400

## Edit a post
@post_routes.route("/<int:post_id>", methods=["PUT"])
@login_required
def edit_post(post_id):
  form = PostForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  edited_post = Post.query.get_or_404(post_id)
  print("-----",current_user.id)
  if current_user.id != edited_post.user_id:
    return {"message": "You must be the owner of this post to edit", "statusCode": 403}

  if form.validate_on_submit():
    edited_post.title = form.data['post_title']
    edited_post.img_url = form.data['img_url']
    edited_post.text = form.data['post_text']

    db.session.commit()

    return edited_post.to_dict()
  else: # error handling
    error_response = {
      'errors': form.errors
    }
    return jsonify(error_response), 400

## Delete a post
@post_routes.delete("/<int:post_id>")
@login_required
def delete_post(post_id):
  post = Post.query.get_or_404(post_id)
  if current_user.id == post.user_id:
    db.session.delete(post)
    db.session.commit()
    return {'message': 'Successfully deleted post'}
  else:
    return {'message': 'Only post author can delete post', 'statusCode': 403}
