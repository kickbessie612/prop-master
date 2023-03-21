from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField, TextAreaField, BooleanField
from wtforms.validators import Length, DataRequired, NumberRange


class PropForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(max=50)])
    description = TextAreaField('Description', validators=[Length(max=255)])
    color = TextAreaField('Color', validators=[Length(max=255)])
    material = TextAreaField('Material', validators=[Length(max=255)])
    length = IntegerField('Length', validators=[Length(max=255)])
    depth = IntegerField('Depth', validators=[Length(max=255)])
    height = IntegerField('Height', validators=[Length(max=255)])
    style = TextAreaField('Style', validators=[Length(max=255)])
    quantity = IntegerField('Quantity', validators=[
                            DataRequired(), Length(max=255)])
    weekly_price = FloatField('Weekly price', validators=[
                              DataRequired(), NumberRange(min=0)])
    availability = BooleanField('Weekly price', validators=[DataRequired()])
    image = StringField('Label', validators=[Length(max=255)])
    category_id = IntegerField('category_id')
