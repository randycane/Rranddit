from .db import db

class Subranddit(db.Model):
  __tablename__ = "subranddits"

  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(100), nullable=False, unique=True)
  owner_id = db.Column(db.Integer, db.ForeignKey("users.id"))
  description = db.Column(db.String(255))
  icon_url = db.Column(db.String)
  banner_img = db.Column(db.String)

  #Relationships
  owner = db.relationship("User", back_populates="subranddit")
  subscriptions = db.relationship("Subscription", back_populates="subranddit", cascade="all, delete-orphan")
  posts = db.relationship("Post", back_populates="subranddit", cascade="all, delete-orphan")

  def to_dict(self):
   return {
      "id": self.id,
      "title": self.title,
      "owner_id": self.owner_id,
      "description": self.description,
      "icon_url": self.icon_url,
      "banner_img": self.banner_img,
      # "subscriptions": [subscription.to_dict() for subscription in self.subscriptions],
    }
