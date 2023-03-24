from app.models import db, Movie, environment, SCHEMA
from sqlalchemy.sql import text


def seed_movies():
    movie1 = Movie(
        name='The Rap of China'
    )
    movie2 = Movie(
        name='Kintsugi'
    )
    movie3 = Movie(
        name='Everything Everywhere All at Once'
    )
    movie4 = Movie(
        name="Father's Wishes"
    )

    db.session.add(movie1)
    db.session.add(movie2)
    db.session.add(movie3)
    db.session.add(movie4)
    db.session.commit()


def undo_movies():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.movies RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM movies"))

    db.session.commit()
