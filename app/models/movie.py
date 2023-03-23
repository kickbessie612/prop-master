from .db import db, environment, SCHEMA
from .user import users_movies


class Movie(db.Model):
    __tablename__ = 'movies'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))

    # user and movie is many-to-many relationship
    users = db.relationship(
        'User', secondary=users_movies, back_populates='movies')

    # 1 movie can have many scenes
    scenes = db.relationship('Scene', back_populates='movie')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name
        }
