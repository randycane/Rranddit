from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    baji = User(
        username='baji', email='baji@aa.io', password='password1')
    shinichiro = User(
        username='shinichiro', email='shinichiro@aa.io', password='password2')
    hina = User(
        username='hina', email='hina@aa.io', password='password3')

    db.session.add(baji)
    db.session.add(shinichiro)
    db.session.add(hina)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
