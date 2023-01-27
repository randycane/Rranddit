from wsgiref.validate import validator
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, url, ValidationError, Length, Regexp
from wtforms.fields import (
    BooleanField, SelectField, DateField, StringField, PasswordField, SubmitField, TextAreaField, TimeField, IntegerField, TextAreaField
)

from app.models.subranddit import Subranddit


def subranddit_exists(form,field):
  subranddit = field.data
  subranddits = Subranddit.query.filter(Subranddit.name == subranddit).first()
  if subranddits:
    raise ValidationError('Subranddit title taken, Choose another title')

def image_url_check(form,field):
  validUrls = (".png", ".jpg", ".jpeg")
  imageUrl = field.data
  if (imageUrl):
    if not imageUrl.endswith(validUrls):
      raise ValidationError('Image icon URL must be a valid type (.png, .jpg, jpeg)')

def banner_url_check(form,field):
  validUrls = (".png", ".jpg", ".jpeg")
  imageUrl = field.data
  if (imageUrl):
    if not imageUrl.endswith(validUrls):
      raise ValidationError('Banner image URL must be a valid type (.png, .jpg, jpeg)')

class SubrandditForm(FlaskForm):
  name = StringField("name", validators=[DataRequired("Subranddit title is required!"), subranddit_exists, Length(min=3, max=30, message="Name length must be between 3 and 30 characters!"), Regexp('^\w+$', message="Subranddit name must contain only letters, numbers, underscores")])
  description = StringField("description", validators=[Length(max=255, message="Description length too long, 255 characters max!")])
  icon_url = StringField("icon_url", validators=[image_url_check])
  banner_img = StringField("banner_img", validators=[banner_url_check])
