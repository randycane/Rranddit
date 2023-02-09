from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required

from ..models.db import db
from ..models.post import Post
from ..models.subranddit import Subranddit
from ..models.subscription import Subscription
from ..forms.subr_form import SubrandditForm
from ..forms.update_subr import UpdateSubrandditForm

subranddit_routes = Blueprint('subranddit', __name__)


#Get all subranddits
@subranddit_routes.route('/all')
def get_all_subranddits():
  subranddit_list = Subranddit.query.order_by(Subranddit.title).all()

  all_subranddits = [subranddit.to_dict() for subranddit in subranddit_list]
  return jsonify(all_subranddits)

# Get details of each subranddit:
@subranddit_routes.route('/<int:subranddit_id>')
def get_subranddit(subranddit_id):
  subranddit = Subranddit.query.get_or_404(subranddit_id)

  return subranddit.to_dict()

# Get all posts in a sub:
@subranddit_routes.route('/<int:subranddit_id>/posts')
def get_all_posts(subranddit_id):
  subranddit_posts = Post.query.filter(Post.subranddit_id == subranddit_id).all()

  all_subranddit_posts = [post.to_dict() for post in subranddit_posts]
  return jsonify(all_subranddit_posts)

# Create a subranddit
@subranddit_routes.route("/", methods=["POST"])
@login_required
def create_subranddit():
  form = SubrandditForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    new_subranddit = Subranddit(
      title = form.data['title'],
      owner_id = current_user.id,
      description = form.data['description'],
      icon_url = form.data['icon_url'],
      banner_img = form.data['banner_img']
    )
    db.session.add(new_subranddit)
    db.session.commit()

    # for joining purposes:
    new_subscription = Subscription(
      user_id = current_user.id,
      subranddit_id = new_subranddit.id
    )
    db.session.add(new_subscription)
    db.session.commit()


    new_subranddit = new_subranddit.to_dict()
    return new_subranddit
  else:
    error_response = {
      'errors': form.errors
    }
    return jsonify(error_response), 400

# Update a subranddit
@subranddit_routes.route("/<int:subranddit_id>", methods=["PUT"])
@login_required
def edit_subranddit(subranddit_id):
  form = UpdateSubrandditForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  edited_subranddit = Subranddit.query.get_or_404(subranddit_id)
  if current_user.id != edited_subranddit.owner_id:
    return {"message": "You must be the owner of this subranddit to edit", "statusCode": 403}

  if form.validate_on_submit():
    edited_subranddit.description = form.data['description']
    edited_subranddit.icon_url = form.data['icon_url']
    edited_subranddit.banner_img = form.data['banner_img']

    db.session.commit()

    return edited_subranddit.to_dict()
  else: # error handling
    error_response = {
      'errors': form.errors
    }
    return jsonify(error_response), 400

# Delete a subranddit
@subranddit_routes.delete("/<int:subranddit_id>")
@login_required
def delete_subranddit(subranddit_id):
  subranddit = Subranddit.query.get_or_404(subranddit_id)
  if current_user.id == subranddit.owner_id:
    db.session.delete(subranddit)
    db.session.commit()
    return {'message': 'Subranddit successfully deleted'}
  else:
    return {'message': 'Only subranddit owner can delete subranddit', 'statusCode': 403}

# Subscribing to a subranddit
@subranddit_routes.route("/<int:subranddit_id>/subscribe", methods=["POST"])
@login_required
def subscribe_to_subreddit(subreddit_id):
  subranddit = Subranddit.query.get_or_404(subranddit_id)
  if not subranddit:
    return {"message": "Subranddit does not exist"}
  subscription = Subscription.query.filter(Subscription.subranddit_id == subranddit_id, Subscription.user_id == current_user.id).first()
  if not subscription:
    new_subscription = Subscription(
      user_id = current_user.id,
      subranddit_id = subranddit_id
    )
    message = "Subscribed successfully"
    db.session.add(new_subscription)
  else:
    message = "Unsubscribed successfully"
    subranddit.subscriptions.remove(subscription)

  db.session.commit()
  return {"message": message}

# Get all subranddits the logged in user is subscribed to
@subranddit_routes.route('/subscriptions')
@login_required
def get_users_subranddits():
    subscriptions = current_user.subscription
    subranddits = [subscription.subranddit.to_dict() for subscription in subscriptions]

    return jsonify(subranddits)
