from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    manager1 = User(
        username='manager', first_name='Dan', last_name='Kram', email='demo@aa.io', password='password', prophouse_id=1, is_manager=True)
    dresser1 = User(
        username='dresser', first_name='Yuan', last_name='Wang', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', first_name='Bobbie', last_name='Green', email='bobbie@aa.io', password='password')
    manager2 = User(
        username='manager2', first_name='Elizabeth', last_name='Hicks', email='demo2@aa.io', password='password', prophouse_id=2, is_manager=True)
    dresser2 = User(
        username='dresser2', first_name='Roy', last_name='Johnson', email='demo3@aa.io', password='password')

    db.session.add(manager1)
    db.session.add(dresser1)
    db.session.add(bobbie)
    db.session.add(manager2)
    db.session.add(dresser2)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
