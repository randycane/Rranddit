from .db import db

class Subscription(db.Model):
    __tablename__ = "subscriptions"

    id = db.Column(db.Integer, primary_key=True)
    subranddit_id = db.Column(db.Integer, db.ForeignKey("subranddits.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    # relationships
    user = db.relationship("User", back_populates="subscription")
    subranddit = db.relationship("Subranddit", back_populates="subscriptions")

    def to_dict(self):
        return {
            "id": self.id,
            "subranddit_id": self.subranddit_id,
            "user_id": self.user_id,
        }
