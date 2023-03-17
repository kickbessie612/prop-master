from .db import db, environment, SCHEMA, add_prefix_for_prod


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
            'image': self.image

        }
