from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length

class CommentForm(FlaskForm):
    comment_text = TextAreaField('comment_text', validators=[DataRequired(),
    Length( min=1, max=4000, message='Comment must be between 1 and 4000 characters')])
