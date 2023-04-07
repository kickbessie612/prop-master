from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import Length, DataRequired


class SceneCreateForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(max=255)])
    image = StringField('Image', validators=[DataRequired(), Length(max=255)])
    movie_id = IntegerField('Movie', validators=[DataRequired()])
