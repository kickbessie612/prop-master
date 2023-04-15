"""empty message

Revision ID: 02d8633ff445
Revises:
Create Date: 2023-03-21 20:27:51.777786

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = '02d8633ff445'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('prophouses',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('name', sa.String(length=255), nullable=True),
                    sa.Column('description', sa.String(), nullable=True),
                    sa.Column('address', sa.String(length=255), nullable=True),
                    sa.Column('city', sa.String(length=255), nullable=True),
                    sa.Column('state', sa.String(length=255), nullable=True),
                    sa.Column('zipcode', sa.Integer(), nullable=True),
                    sa.Column('phone', sa.String(), nullable=True),
                    sa.Column('logo', sa.String(length=255), nullable=True),
                    sa.Column('image', sa.Text(), nullable=True),
                    sa.Column('introduction', sa.Text(), nullable=True),
                    sa.Column('lat', sa.Float(), nullable=True),
                    sa.Column('lng', sa.Float(), nullable=True),
                    sa.Column('facebook', sa.String(
                        length=255), nullable=True),
                    sa.Column('twitter', sa.String(length=255), nullable=True),
                    sa.Column('instagram', sa.String(
                        length=255), nullable=True),
                    sa.Column('yelp', sa.String(length=255), nullable=True),
                    sa.Column('pinterest', sa.String(
                        length=255), nullable=True),
                    sa.Column('embed_map', sa.Text(), nullable=True),
                    sa.Column('monday_open', sa.Integer(), nullable=True),
                    sa.Column('monday_close', sa.Integer(), nullable=True),
                    sa.Column('tuesday_open', sa.Integer(), nullable=True),
                    sa.Column('tuesday_close', sa.Integer(), nullable=True),
                    sa.Column('wednesday_open', sa.Integer(), nullable=True),
                    sa.Column('wednesday_close', sa.Integer(), nullable=True),
                    sa.Column('thursday_open', sa.Integer(), nullable=True),
                    sa.Column('thursday_close', sa.Integer(), nullable=True),
                    sa.Column('friday_open', sa.Integer(), nullable=True),
                    sa.Column('friday_close', sa.Integer(), nullable=True),
                    sa.Column('saturday_open', sa.Integer(), nullable=True),
                    sa.Column('saturday_close', sa.Integer(), nullable=True),
                    sa.Column('sunday_open', sa.Integer(), nullable=True),
                    sa.Column('sunday_close', sa.Integer(), nullable=True),
                    sa.PrimaryKeyConstraint('id'),
                    sa.UniqueConstraint('name')
                    )
    if environment == "production":
        op.execute(f"ALTER TABLE prophouses SET SCHEMA {SCHEMA};")

    op.create_table('movies',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('name', sa.String(length=255), nullable=True),
                    sa.PrimaryKeyConstraint('id')
                    )
    if environment == "production":
        op.execute(f"ALTER TABLE movies SET SCHEMA {SCHEMA};")

    op.create_table('users',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('username', sa.String(length=40), nullable=True),
                    sa.Column('email', sa.String(length=255), nullable=True),
                    sa.Column('hashed_password', sa.String(
                        length=255), nullable=True),
                    sa.Column('first_name', sa.String(
                        length=255), nullable=True),
                    sa.Column('last_name', sa.String(
                        length=255), nullable=True),
                    sa.Column('is_manager', sa.Boolean(), nullable=True),
                    sa.Column('prophouse_id', sa.Integer(), nullable=True),
                    sa.ForeignKeyConstraint(
                        ['prophouse_id'], ['prophouses.id'], ),
                    sa.PrimaryKeyConstraint('id'),
                    sa.UniqueConstraint('email'),
                    sa.UniqueConstraint('username')
                    )
    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")

    op.create_table('categories',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('name', sa.String(length=255), nullable=True),
                    sa.Column('parent_id', sa.Integer(), nullable=True),
                    sa.PrimaryKeyConstraint('id')
                    )
    if environment == "production":
        op.execute(f"ALTER TABLE categories SET SCHEMA {SCHEMA};")

    op.create_table('props',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('name', sa.String(length=255), nullable=True),
                    sa.Column('description', sa.String(
                        length=255), nullable=True),
                    sa.Column('color', sa.String(length=255), nullable=True),
                    sa.Column('material', sa.String(
                        length=255), nullable=True),
                    sa.Column('length', sa.Integer(), nullable=True),
                    sa.Column('depth', sa.Integer(), nullable=True),
                    sa.Column('height', sa.Integer(), nullable=True),
                    sa.Column('style', sa.String(length=255), nullable=True),
                    sa.Column('barcode', sa.String(length=10), nullable=True),
                    sa.Column('quantity', sa.Integer(), nullable=True),
                    sa.Column('weekly_price', sa.Float(), nullable=True),
                    sa.Column('availability', sa.Boolean(), nullable=True),
                    sa.Column('image', sa.String(), nullable=True),
                    sa.Column('prophouse_id', sa.Integer(), nullable=True),
                    sa.Column('category_id', sa.Integer(), nullable=True),
                    sa.ForeignKeyConstraint(
                        ['category_id'], ['categories.id'], ),
                    sa.ForeignKeyConstraint(
                        ['prophouse_id'], ['prophouses.id'], ),
                    sa.PrimaryKeyConstraint('id'),
                    sa.UniqueConstraint('barcode')
                    )
    if environment == "production":
        op.execute(f"ALTER TABLE props SET SCHEMA {SCHEMA};")

    op.create_table('forms',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('name', sa.String(length=255), nullable=True),
                    sa.Column('url', sa.String(length=255), nullable=True),
                    sa.Column('prophouse_id', sa.Integer(), nullable=True),
                    sa.ForeignKeyConstraint(
                        ['prophouse_id'], ['prophouses.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )
    if environment == "production":
        op.execute(f"ALTER TABLE forms SET SCHEMA {SCHEMA};")

    op.create_table('scenes',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('name', sa.String(length=255), nullable=True),
                    sa.Column('image', sa.String(length=255), nullable=True),
                    sa.Column('movie_id', sa.Integer(), nullable=True),
                    sa.ForeignKeyConstraint(['movie_id'], ['movies.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )
    if environment == "production":
        op.execute(f"ALTER TABLE scenes SET SCHEMA {SCHEMA};")

    op.create_table('setlists',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('name', sa.String(length=255), nullable=True),
                    sa.Column('user_id', sa.Integer(), nullable=True),
                    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )
    if environment == "production":
        op.execute(f"ALTER TABLE setlists SET SCHEMA {SCHEMA};")

    op.create_table('users_movies',
                    sa.Column('user_id', sa.Integer(), nullable=True),
                    sa.Column('movie_id', sa.Integer(), nullable=True),
                    sa.ForeignKeyConstraint(['movie_id'], ['movies.id'], ),
                    sa.ForeignKeyConstraint(['user_id'], ['users.id'], )
                    )
    if environment == "production":
        op.execute(f"ALTER TABLE users_movies SET SCHEMA {SCHEMA};")

    op.create_table('scenes_props',
                    sa.Column('scene_id', sa.Integer(), nullable=True),
                    sa.Column('prop_id', sa.Integer(), nullable=True),
                    sa.ForeignKeyConstraint(['prop_id'], ['props.id'], ),
                    sa.ForeignKeyConstraint(['scene_id'], ['scenes.id'], )
                    )
    if environment == "production":
        op.execute(f"ALTER TABLE scenes_props SET SCHEMA {SCHEMA};")

    op.create_table('setlists_props',
                    sa.Column('setlist_id', sa.Integer(), nullable=True),
                    sa.Column('prop_id', sa.Integer(), nullable=True),
                    sa.ForeignKeyConstraint(['prop_id'], ['props.id'], ),
                    sa.ForeignKeyConstraint(['setlist_id'], ['setlists.id'], )
                    )
    if environment == "production":
        op.execute(f"ALTER TABLE setlists_props SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('setlists_props')
    op.drop_table('users_movies')
    op.drop_table('setlists')
    op.drop_table('scenes_props')
    op.drop_table('users')
    op.drop_table('scenes')
    op.drop_table('props')
    op.drop_table('forms')
    op.drop_table('prophouses')
    op.drop_table('movies')
    op.drop_table('categories')
    # ### end Alembic commands ###
