from flask.cli import AppGroup
from .users import seed_users, undo_users
from .movies import seed_movies, undo_movies
from .users_movies import seed_users_movies, undo_users_movies
from .prophouses import seed_prophouses, undo_prophouses
from .forms import seed_forms, undo_forms
from .business_days import seed_business_days, undo_business_days
from .scenes import seed_scenes, undo_scenes
from .setlists import seed_setlists, undo_setlists

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
        undo_users()
        undo_movies()
        undo_users_movies()
        undo_prophouses()
        undo_forms()
        undo_business_days()
        undo_scenes()
        undo_setlists()
    seed_users()
    seed_movies()
    seed_users_movies()
    seed_prophouses()
    seed_forms()
    seed_business_days()
    seed_scenes()
    seed_setlists()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_movies()
    undo_users_movies()
    undo_prophouses()
    undo_forms()
    undo_business_days()
    undo_scenes()
    undo_setlists()
    # Add other undo functions here
