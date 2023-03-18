from app.models import db, BusinessDay, environment, SCHEMA
from datetime import time
from sqlalchemy.sql import text


def seed_business_days():
    business_day1 = BusinessDay(
        weekday=0,
        open_time=time(6),
        close_time=time(18),
        prophouse_id=1)
    business_day2 = BusinessDay(
        weekday=1,
        open_time=time(6),
        close_time=time(18),
        prophouse_id=1)
    business_day3 = BusinessDay(
        weekday=2,
        open_time=time(6),
        close_time=time(18),
        prophouse_id=1)
    business_day4 = BusinessDay(
        weekday=3,
        open_time=time(6),
        close_time=time(18),
        prophouse_id=1)
    business_day5 = BusinessDay(
        weekday=4,
        open_time=time(6),
        close_time=time(18),
        prophouse_id=1)
    business_day6 = BusinessDay(
        weekday=0,
        open_time=time(6),
        close_time=time(17),
        prophouse_id=2)
    business_day7 = BusinessDay(
        weekday=1,
        open_time=time(6),
        close_time=time(17),
        prophouse_id=2)
    business_day8 = BusinessDay(
        weekday=2,
        open_time=time(6),
        close_time=time(17),
        prophouse_id=2)
    business_day9 = BusinessDay(
        weekday=3,
        open_time=time(6),
        close_time=time(17),
        prophouse_id=2)
    business_day10 = BusinessDay(
        weekday=4,
        open_time=time(6),
        close_time=time(17),
        prophouse_id=2)
    business_day11 = BusinessDay(
        weekday=0,
        open_time=time(7),
        close_time=time(17),
        prophouse_id=3)
    business_day12 = BusinessDay(
        weekday=1,
        open_time=time(7),
        close_time=time(17),
        prophouse_id=3)
    business_day13 = BusinessDay(
        weekday=2,
        open_time=time(7),
        close_time=time(17),
        prophouse_id=3)
    business_day14 = BusinessDay(
        weekday=3,
        open_time=time(7),
        close_time=time(17),
        prophouse_id=3)
    business_day15 = BusinessDay(
        weekday=4,
        open_time=time(7),
        close_time=time(17),
        prophouse_id=3)

    db.session.add(business_day1)
    db.session.add(business_day2)
    db.session.add(business_day3)
    db.session.add(business_day4)
    db.session.add(business_day5)
    db.session.add(business_day6)
    db.session.add(business_day7)
    db.session.add(business_day8)
    db.session.add(business_day9)
    db.session.add(business_day10)
    db.session.add(business_day11)
    db.session.add(business_day12)
    db.session.add(business_day13)
    db.session.add(business_day14)
    db.session.add(business_day15)
    db.session.commit()


def undo_business_days():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.business_days RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM business_days"))

    db.session.commit()
