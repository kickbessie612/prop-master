from .db import db, environment, SCHEMA, add_prefix_for_prod

# join table for setlists & props
setlists_props = db.Table('setlists_props',
                          db.metadata,
                          db.Column('setlist_id', db.Integer,
                                    db.ForeignKey('setlists.id')),
                          db.Column('prop_id', db.Integer,
                                    db.ForeignKey('props.id')),
                          extend_existing=True
                          )

if environment == "production":
    setlists_props.schema = SCHEMA


class Setlist(db.Model):
    __tablename__ = 'setlists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))

    # 1 user can have many setlists
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod(
        'users.id')))
    user = db.relationship('User', back_populates='setlists')

    # setlist and prop is many-to-many relationship
    props = db.relationship(
        'Prop', secondary=setlists_props, back_populates='setlists')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name
        }
