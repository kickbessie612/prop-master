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

    # 1 prophouse can have many business days
    business_days = db.relationship('BusinessDay', back_populates='prophouse')

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
            'lng': self.lng
        }

    def to_dict_detail(self):
        dict = self.to_dict()
        # TODO: fix time serialization
        dict['business_days'] = [day.to_dict() for day in self.business_days]
