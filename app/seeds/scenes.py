from app.models import db, Scene, environment, SCHEMA
from sqlalchemy.sql import text


def seed_scenes():
    scene1 = Scene(
        name='coach',
        movie_id=1,
        image='https://i.imgur.com/WoslQY8.jpeg'

    )
    scene2 = Scene(
        name='barrel',
        movie_id=1,
        image='https://m.media-amazon.com/images/M/MV5BOTIzNjdlODgtNDdlMC00NWQwLWI0YjctYjEzZDc2NjllODhjXkEyXkFqcGdeQXVyNzAzNjUzNTA@._V1_.jpg'
    )
    scene3 = Scene(
        name='studio',
        movie_id=2,
        image='https://i.imgur.com/Zsjb1ak.png'
    )
    scene4 = Scene(
        name='home',
        movie_id=2,
        image='https://i.imgur.com/M702w37.png'
    )
    scene5 = Scene(
        name='office',
        movie_id=3,
        image='https://static01.nyt.com/images/2022/04/20/arts/everything-mom1/merlin_204246447_9fad14ba-177e-4205-8e0f-4d1008592bc7-superJumbo.jpg'
    )
    scene6 = Scene(
        name='kitchen',
        movie_id=3,
        image='https://i.kinja-img.com/gawker-media/image/upload/c_fit,f_auto,g_center,q_60,w_965/032deb8ed3304e04756176ef6ce9bbce.jpg'
    )

    db.session.add(scene1)
    db.session.add(scene2)
    db.session.add(scene3)
    db.session.add(scene4)
    db.session.add(scene5)
    db.session.add(scene6)
    db.session.commit()


def undo_scenes():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.scenes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM scenes"))

    db.session.commit()
