from app.models import db, Setlist, Prop, SCHEMA, environment
from sqlalchemy.sql import text


def seed_setlists_props():
    setlists = Setlist.query.all()
    props = Prop.query.all()

    setlists[0].props.extend([props[7], props[8]])
    setlists[1].props.extend([props[0]])

    db.session.commit()


def undo_setlists_props():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.setlists_props RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM setlists_props"))

    db.session.commit()
