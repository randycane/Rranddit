from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    boruto = User(
        username='boruto', email='boruto@aa.io', password='password1')
    naruto = User(
        username='naruto', email='naruto@aa.io', password='password2')
    neji = User(
        username='neji', email='neji@aa.io', password='password3')

    db.session.add(boruto)
    db.session.add(naruto)
    db.session.add(neji)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
