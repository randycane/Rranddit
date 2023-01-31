from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    deku = User(
        username='deku', email='deku@aa.io', password='password1')
    barou = User(
        username='barou', email='barou@aa.io', password='password2')
    nagi = User(
        username='nagi', email='nagi@aa.io', password='password3')

    db.session.add(deku)
    db.session.add(barou)
    db.session.add(nagi)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
