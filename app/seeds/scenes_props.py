from app.models import db, Scene, Prop, SCHEMA, environment
from sqlalchemy.sql import text


def seed_scenes_props():
    scenes = Scene.query.all()
    props = Prop.query.all()

    scenes[0].props.extend([props[0]])
    scenes[1].props.extend([props[1]])
    scenes[2].props.extend([props[2], props[3], props[4]])
    scenes[4].props.extend([props[5]])
    scenes[5].props.extend([props[6]])

    db.session.commit()


def undo_scenes_props():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.scenes_props RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM scenes_props"))

    db.session.commit()
