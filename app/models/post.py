from .db import db

class Post(db.Model):
  __tablename__ = "posts"

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  subranddit_id = db.Column(db.Integer, db.ForeignKey("subranddits.id"), nullable=False)
  post_title = db.Column(db.String(200), nullable=False)
  img_url = db.Column(db.String)
  post_text = db.Column(db.String)

  #relationships
  user = db.relationship("User", back_populates="posts")
  subranddit = db.relationship("Subranddit", back_populates="posts")
  # votes = db.relationship("Vote", back_populates="post", cascade="all, delete-orphan")
  comments = db.relationship("Comment", back_populates="post")

  # def total_votes(self):
  #   return sum(vote.value for vote in self.votes)

  def to_dict(self):
      return {
          "id": self.id,
          "user_id": self.user_id,
          "username": self.user.username,
          "subranddit_id": self.subranddit_id,
          "subranddit_name": self.subranddit.name,
          "post_title": self.post_title,
          "img_url": self.img_url,
          "post_text": self.post_text,
          "link_url": self.link_url,
          # "total_votes": self.total_votes(),
          # "votes": [vote.to_dict() for vote in self.votes],
      }
