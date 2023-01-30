from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, url, ValidationError, Length
from wtforms.fields import (
    BooleanField, SelectField, DateField, StringField, PasswordField, SubmitField, TextAreaField, TimeField, IntegerField, TextAreaField, RadioField
)

class PostForm(FlaskForm):
  post_title = StringField("post_title", validators=[DataRequired("Title is required!"), Length(min=3, max=200, message="Post title should be between 3 and 120 characters long")])
  img_url = StringField("img_url")
  link_url = StringField("link_url", filters = [lambda x: x or None])
  post_text = TextAreaField("post_text", validators=[Length(max=2000, message="Text length must be less than 2000 characters!")], filters = [lambda x: x or None])
  subranddit_id = IntegerField("subranddit_id")
