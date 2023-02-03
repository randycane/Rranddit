from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, Length


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

class UpdateSubrandditForm(FlaskForm):
  description = StringField("description", validators=[Length(max=255, message="Description length too long, 255 characters max!")])
  icon_url = StringField("icon_url", validators=[image_url_check])
  banner_img = StringField("banner_img", validators=[banner_url_check])
