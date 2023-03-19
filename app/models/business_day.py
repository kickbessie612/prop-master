from .db import db, environment, SCHEMA, add_prefix_for_prod


class BusinessDay(db.Model):
    __tablename__ = 'business_days'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    days = {
        0: 'Monday',
        1: 'Tuesday',
        2: 'Wednesday',
        3: 'Thursday',
        4: 'Friday',
        5: 'Saturday',
        6: 'Sunday'
    }

    id = db.Column(db.Integer, primary_key=True)
    weekday = db.Column(db.Integer)
    open_time = db.Column(db.Time, nullable=True)
    close_time = db.Column(db.Time, nullable=True)

    # 1 prophouse can have many business days
    prophouse_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('prophouses.id')))

    prophouse = db.relationship('Prophouse', back_populates='business_days')

    def to_dict(self):
        return {
            'id': self.id,
            'weekday': self.weekday,
            'openTime': self.open_time,
            'closeTime': self.close_time,
            'prophouseId': self.prophouse_id,
            'formattedWeekday': self.days[self.weekday]
        }
