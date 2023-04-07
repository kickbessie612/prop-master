from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import Length, DataRequired


class MovieForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(max=255)])
