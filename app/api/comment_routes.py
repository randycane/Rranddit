from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from ..models.db import db
from ..models.comment import Comment
from ..forms.comment_form import CommentForm

comment_routes = Blueprint('comment', __name__)

#Edit a comment
@comment_routes.route('/<int:commentId>', methods=['PUT'])
@login_required
def edit_comment(commentId):
  form = CommentForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  edited_comment = Comment.query.get_or_404(commentId)

  if current_user.id != edited_comment.user_id:
    return {"message": "You don't have authorization to edit this comment", "statusCode": 403}

  if form.validate_on_submit():
    edited_comment.comment_text = form.data['comment_text']

    db.session.commit()
    return edited_comment.to_dict()
  else:
    error_response = {
      'errors': form.errors
    }
    return jsonify(error_response), 400

#Delete a comment
@comment_routes.route('<int:commentId>', methods=["DELETE"])
@login_required
def delete_comment(commentId):
  comment = Comment.query.get_or_404(commentId)

  if current_user.id == comment.user_id:
    db.session.delete(comment)
    db.session.commit()
    return {'message': 'Comment Successfully deleted'}
  else:
    return {"message": "You don't have authorization to delete this comment", "statusCode": 403}
