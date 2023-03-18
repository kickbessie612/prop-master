from .db import db, environment, SCHEMA, add_prefix_for_prod


class Form(db.Model):
    __tablename__ = 'forms'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    url = db.Column(db.String(255))

    # 1 prophouse can have many forms
    prophouse_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('prophouses.id')))

    prophouse = db.relationship('Prophouse', back_populates='forms')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'url': self.url
        }
