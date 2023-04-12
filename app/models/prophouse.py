from .db import db, environment, SCHEMA


class Prophouse(db.Model):
    __tablename__ = 'prophouses'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True)
    description = db.Column(db.String)
    address = db.Column(db.String(255))
    city = db.Column(db.String(255))
    state = db.Column(db.String(255))
    zipcode = db.Column(db.Integer)
    phone = db.Column(db.String)
    logo = db.Column(db.String(255), nullable=True)
    lat = db.Column(db.Float, nullable=True)
    lng = db.Column(db.Float, nullable=True)
    facebook = db.Column(db.String(255), nullable=True)
    twitter = db.Column(db.String(255), nullable=True)
    instagram = db.Column(db.String(255), nullable=True)
    yelp = db.Column(db.String(255), nullable=True)
    pinterest = db.Column(db.String(255), nullable=True)
    embed_map = db.Column(db.String(255), nullable=True)
    monday_open = db.Column(db.Integer, nullable=True)
    monday_close = db.Column(db.Integer, nullable=True)
    tuesday_open = db.Column(db.Integer, nullable=True)
    tuesday_close = db.Column(db.Integer, nullable=True)
    wednesday_open = db.Column(db.Integer, nullable=True)
    wednesday_close = db.Column(db.Integer, nullable=True)
    thursday_open = db.Column(db.Integer, nullable=True)
    thursday_close = db.Column(db.Integer, nullable=True)
    friday_open = db.Column(db.Integer, nullable=True)
    friday_close = db.Column(db.Integer, nullable=True)
    saturday_open = db.Column(db.Integer, nullable=True)
    saturday_close = db.Column(db.Integer, nullable=True)
    sunday_open = db.Column(db.Integer, nullable=True)
    sunday_close = db.Column(db.Integer, nullable=True)

    # 1 prophouse can have many users(as manager)
    users = db.relationship('User', back_populates='prophouse')

    # 1 prophouse can have many props
    props = db.relationship('Prop', back_populates='prophouse')

    # 1 prophouse can have many forms
    forms = db.relationship('Form', back_populates='prophouse')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'address': self.address,
            'city': self.city,
            'zipcode': self.zipcode,
            'phone': self.phone,
            'logo': self.logo,
            'lat': self.lat,
            'lng': self.lng,
            'embed_map': self.embed_map,
            'monday_open': self.monday_open,
            'monday_close': self.monday_close,
            'tuesday_open': self.tuesday_open,
            'tuesday_close': self.tuesday_close,
            'wednesday_open': self.wednesday_open,
            'wednesday_close': self.wednesday_close,
            'thursday_open': self.thursday_open,
            'thursday_close': self.thursday_close,
            'friday_open': self.friday_open,
            'friday_close': self.friday_close,
            'saturday_open': self.saturday_open,
            'saturday_close': self.saturday_close,
            'sunday_open': self.sunday_open,
            'sunday_close': self.sunday_close,
        }
