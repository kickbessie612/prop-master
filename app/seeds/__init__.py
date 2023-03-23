from flask.cli import AppGroup
from .users import seed_users, undo_users
from .movies import seed_movies, undo_movies
from .users_movies import seed_users_movies, undo_users_movies
from .prophouses import seed_prophouses, undo_prophouses
from .forms import seed_forms, undo_forms
from .business_days import seed_business_days, undo_business_days
from .scenes import seed_scenes, undo_scenes
from .setlists import seed_setlists, undo_setlists
from .categories import seed_categories, undo_categories
from .scenes_props import seed_scenes_props, undo_scenes_props
from .setlists_props import seed_setlists_props, undo_setlists_props
from .props import seed_props, undo_props

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below

        # Before seeding, truncate all tables prefixed with schema name
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.setlists_props RESTART IDENTITY CASCADE;")
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.scenes_props RESTART IDENTITY CASCADE;")
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users_movies RESTART IDENTITY CASCADE;")
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.setlists RESTART IDENTITY CASCADE;")
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.scenes RESTART IDENTITY CASCADE;")
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.business_days RESTART IDENTITY CASCADE;")
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.forms RESTART IDENTITY CASCADE;")
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.props RESTART IDENTITY CASCADE;")
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.categories RESTART IDENTITY CASCADE;")
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.movies RESTART IDENTITY CASCADE;")
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.prophouses RESTART IDENTITY CASCADE;")
        # Add a truncate command here for every table that will be seeded.
        db.session.commit()

    seed_prophouses()
    seed_users()
    seed_movies()
    seed_categories()
    seed_props()
    seed_forms()
    seed_business_days()
    seed_scenes()
    seed_setlists()
    seed_users_movies()
    seed_scenes_props()
    seed_setlists_props()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_setlists_props()
    undo_scenes_props()
    undo_users_movies()
    undo_setlists()
    undo_scenes()
    undo_business_days()
    undo_forms()
    undo_props()
    undo_categories()
    undo_prophouses()
    undo_movies()
    undo_users()
    # Add other undo functions here
