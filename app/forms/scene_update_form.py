from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import Length, DataRequired


class SceneUpdateForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(max=255)])
    image = StringField('Image', validators=[DataRequired(), Length(max=255)])
