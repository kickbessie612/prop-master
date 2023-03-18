from .db import db, environment, SCHEMA, add_prefix_for_prod

# join table for scenes & props
scenes_props = db.Table('scenes_props',
                        db.metadata,
                        db.Column('scene_id', db.Integer,
                                  db.ForeignKey('scenes.id')),
                        db.Column('prop_id', db.Integer,
                                  db.ForeignKey('props.id')),
                        extend_existing=True
                        )


class Scene(db.Model):
    __tablename__ = 'scenes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    image = db.Column(db.String(255))

    # 1 movie can have many scenes
    movie_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod(
        'movies.id')))
    movie = db.relationship('Movie', back_populates='scenes')

    # scene and prop is many-to-many relationship
    props = db.relationship(
        'Prop', secondary=scenes_props, back_populates='scenes')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'image': self.image
        }
