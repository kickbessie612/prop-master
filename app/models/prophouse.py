from .db import db, environment, SCHEMA


class Prophouse(db.Model):
    __tablename__ = 'prophouses'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True)
    description = db.Column(db.String(255))
    address = db.Column(db.String(255))
    city = db.Column(db.String(255))
    state = db.Column(db.String(255))
    zipcode = db.Column(db.Integer)
    phone = db.Column(db.Integer)
    logo = db.Column(db.String(255), nullable=True)

    # 1 prophouse can have many business days
    business_days = db.relationship('BusinessDay', back_populates='prophouse')

    # 1 prophouse can have many users(as manager)
    users = db.relationship('User', back_populates='prophouse')

    # 1 prophouse can have many props
    props = db.relationship('Prop', back_populates='prophouse')

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
            'businessDays': [day.to_dict() for day in self.business_days]
        }
