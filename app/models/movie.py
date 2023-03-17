from .db import db, environment, SCHEMA, add_prefix_for_prod

users_movies = db.Table('users_movies',
                        db.metadata,
                        db.Column('user_id', db.Integer,
                                  db.ForeignKey('users.id')),
                        db.Column('movie_id', db.Integer,
                                  db.ForeignKey('movies.id'))
                        )


class Movie(db.Model):
    __tablename__ = 'movies'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))

    users = db.relationship(
        'User', secondary=users_movies, back_populates='movies')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name
        }
