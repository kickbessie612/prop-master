from app.models import db, Category, environment, SCHEMA
from sqlalchemy.sql import text


def seed_categories():
    category1 = Category(
        name='furniture')

    category2 = Category(
        name='chair',
        parent_id=1)

    category3 = Category(
        name='barrel',
        parent_id=1)

    category4 = Category(
        name='table',
        parent_id=1)

    category5 = Category(
        name='fixtures')

    category6 = Category(
        name='lamp',
        parent_id=5)

    category7 = Category(
        name='drapery')

    category8 = Category(
        name='drapes',
        parent_id=7)

    category9 = Category(
        name='hand prop')

    category10 = Category(
        name='file box',
        parent_id=9)

    category11 = Category(
        name='industrial/garage furniture',
        parent_id=1)

    db.session.add(category1)
    db.session.add(category2)
    db.session.add(category3)
    db.session.add(category4)
    db.session.add(category5)
    db.session.add(category6)
    db.session.add(category7)
    db.session.add(category8)
    db.session.add(category9)
    db.session.add(category10)
    db.session.add(category11)
    db.session.commit()


def undo_categories():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.categories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM categories"))

    db.session.commit()
