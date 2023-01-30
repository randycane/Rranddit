from app.models import db, Subscription

def seed_subscriptions():
  subscription1 = Subscription(
    subreddit_id = 1,
    user_id = 2,
  )
  subscription2 = Subscription(
    subreddit_id = 2,
    user_id = 3,
  )
  subscription3 = Subscription(
    subreddit_id = 3,
    user_id = 3,
  )
  subscription4 = Subscription(
    subreddit_id = 4,
    user_id = 1,
  )
  subscription5 = Subscription(
    subranddit_id = 5,
    user_id = 2,
  )
  db.session.add(subscription1)
  db.session.add(subscription2)
  db.session.add(subscription3)
  db.session.add(subscription4)
  db.session.add(subscription5)
  db.session.commit()

def undo_subscriptions():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
