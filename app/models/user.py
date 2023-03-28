from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

# join table for users & movies
users_movies = db.Table('users_movies',
                        db.metadata,
                        db.Column('user_id', db.Integer, db.ForeignKey(
                            add_prefix_for_prod('users.id'))),
                        db.Column('movie_id', db.Integer, db.ForeignKey(
                            add_prefix_for_prod('movies.id')))
                        )

if environment == "production":
    users_movies.schema = SCHEMA


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40),  unique=True)
    email = db.Column(db.String(255),  unique=True)
    hashed_password = db.Column(db.String(255))
    first_name = db.Column(db.String(255))
    last_name = db.Column(db.String(255))
    is_manager = db.Column(db.Boolean)

    # 1 prophouse can have many users(as manager)
    prophouse_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod(
        'prophouses.id')), nullable=True)
    prophouse = db.relationship('Prophouse', back_populates='users')

    # user and movie is many-to-many relationship
    movies = db.relationship(
        'Movie', secondary=users_movies, back_populates='users')

    # 1 user can have many setlists
    setlists = db.relationship('Setlist', back_populates='user')

    @ property
    def password(self):
        return self.hashed_password

    @ password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'is_manager': self.is_manager,
            'prophouse_id': self.prophouse_id
        }
