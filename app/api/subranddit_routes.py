from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required

subranddit_routes = Blueprint('subranddit', __name__)


#Get all subranddits
@subranddit_routes.route('/all')
def get_all_subranddits():
  subranddit_list = Subranddit.query.order_by(Subranddit.name).all()

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
  subranddit_posts = Post.query.filter(Post.subranddit_id == subranddit_id).order_by(Post.created_at.desc()).all()

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
      name = form.data['name'],
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
