from .db import db, environment, SCHEMA, add_prefix_for_prod

# join table for scenes & props
scenes_props = db.Table('scenes_props',
                        db.metadata,
                        db.Column('scene_id', db.Integer,
                                  db.ForeignKey('scenes.id')),
                        db.Column('prop_id', db.Integer,
                                  db.ForeignKey('props.id'))
                        )


# join table for setlists & props
setlists_props = db.Table('setlists_props',
                          db.metadata,
                          db.Column('setlist_id', db.Integer,
                                    db.ForeignKey('setlists.id')),
                          db.Column('prop_id', db.Integer,
                                    db.ForeignKey('props.id'))
                          )


class Prop(db.Model):
    __tablename__ = 'props'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True)
    description = db.Column(db.String(255))
    color = db.Column(db.String(255), nullable=True)
    material = db.Column(db.String(255), nullable=True)
    length = db.Column(db.Integer, nullable=True)
    depth = db.Column(db.Integer, nullable=True)
    height = db.Column(db.Integer, nullable=True)
    style = db.Column(db.String(255), nullable=True)
    barcode = db.Column(db.Integer)
    quantity = db.Column(db.Integer)
    weekly_price = db.Column(db.Float)
    availability = db.Column(db.Boolean)
    image = db.Column(db.String, nullable=True)

    # 1 prophouse can have many props
    prophouse_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('prophouses.id')))

    prophouse = db.relationship('Prophouse', back_populates='props')

    # 1 category can have many props
    category_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('categories.id')))

    category = db.relationship('Category', back_populates='props')

    # scene and prop is many-to-many relationship
    scenes = db.relationship(
        'Scene', secondary=scenes_props, back_populates='props')

    # setlist and prop is many-to-many relationship
    setlists = db.relationship(
        'Setlist', secondary=setlists_props, back_populates='props')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'color': self.color,
            'material': self.material,
            'length': self.length,
            'depth': self.depth,
            'height': self.height,
            'style': self.style,
            'barcode': self.barcode,
            'quantity': self.quantity,
            'weeklyPrice': self.weekly_price,
            'availability': self.availability,
            'image': self.image,
            'category': self.category.to_dict()

        }
