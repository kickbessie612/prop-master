from app.models import db, Setlist, environment, SCHEMA
from sqlalchemy.sql import text


def seed_setlists():
    setlist1 = Setlist(
        name='Single(short)',
        user_id=2
    )
    setlist2 = Setlist(
        name='Oppo(commercial)',
        user_id=2
    )
    setlist3 = Setlist(
        name='Lonely Blue Night',
        user_id=2
    )

    db.session.add(setlist1)
    db.session.add(setlist2)
    db.session.add(setlist3)
    db.session.commit()


def undo_setlists():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.setlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM setlists"))

    db.session.commit()
