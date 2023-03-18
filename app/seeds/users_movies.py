from app.models import db, User, Movie, SCHEMA, environment
from sqlalchemy.sql import text


def seed_users_movies():
    users = User.query.all()
    movies = Movie.query.all()

    users[1].movies.extend([movies[0], movies[1]])
    users[2].movies.extend([movies[2]])

    db.session.commit()


def undo_users_movies():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users_movies RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users_movies"))

    db.session.commit()
