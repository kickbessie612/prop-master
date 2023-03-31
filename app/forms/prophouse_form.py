from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import Optional, NumberRange


class ProphouseForm(FlaskForm):
    monday_open = IntegerField('Monday Open', validators=[
        Optional(), NumberRange(min=0, max=23)])
    monday_close = IntegerField('Monday Close', validators=[
                                Optional(), NumberRange(min=0, max=23)])
    tuesday_open = IntegerField('Tuesday Open', validators=[
                                Optional(), NumberRange(min=0, max=23)])
    tuesday_close = IntegerField('Tuesday Close', validators=[
                                 Optional(), NumberRange(min=0, max=23)])
    wednesday_open = IntegerField('Wednesday Open', validators=[
                                  Optional(), NumberRange(min=0, max=23)])
    wednesday_close = IntegerField('Wednesday Close', validators=[
                                   Optional(), NumberRange(min=0, max=23)])
    thursday_open = IntegerField('Thursday Open', validators=[
                                 Optional(), NumberRange(min=0, max=23)])
    thursday_close = IntegerField('Thursday Close', validators=[
                                  Optional(), NumberRange(min=0, max=23)])
    friday_open = IntegerField('Friday Open', validators=[
                               Optional(), NumberRange(min=0, max=23)])
    friday_close = IntegerField('Friday Close', validators=[
                                Optional(), NumberRange(min=0, max=23)])
    saturday_open = IntegerField('Saturday Open', validators=[
                                 Optional(), NumberRange(min=0, max=23)])
    saturday_close = IntegerField('Saturday Close', validators=[
                                  Optional(), NumberRange(min=0, max=23)])
    sunday_open = IntegerField('Sunday Open', validators=[
                               Optional(), NumberRange(min=0, max=23)])
    sunday_close = IntegerField('Sunday Close', validators=[
                                Optional(), NumberRange(min=0, max=23)])
