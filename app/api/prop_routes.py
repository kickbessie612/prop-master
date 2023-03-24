from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from sqlalchemy.orm import joinedload
from app.models import db, Prop
from app.forms import PropForm
from .utils import validation_errors_to_error_messages


prop_routes = Blueprint('prop', __name__)


# GET ALL PROPS
@prop_routes.route('')
def get_all_props():
    """
    Query for all props and returns them in a list of prop dictionaries
    """
    props = Prop.query.options(joinedload(Prop.category)).all()
    return [prop.to_dict_detail() for prop in props]


# GET PROP BY ID
@prop_routes.route('/<int:id>')
def get_prop(id):
    """
    Query for a prop by id and returns that prop in a dictionary
    """
    prop = Prop.query.get(id)
    if prop:
        return jsonify(prop.to_dict_detail())
    else:
        return {'message': 'Prop not found'}, 404


# CREATE A PROP
@prop_routes.route('', methods=['POST'])
@login_required
def create_prop():
    """
    Query for creating a prop and returning it as a dictionary
    """
    if not current_user.is_manager:
        return {"message": "Authentication required"}, 401

    form = PropForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_prop = Prop()
        form.populate_obj(new_prop)
        new_prop.prophouse_id = current_user.prophouse_id
        db.session.add(new_prop)
        db.session.commit()
        return jsonify(
            new_prop.to_dict_detail()
        )
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# UPDATE A PROP
@prop_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_prop(id):
    """
    Update a prop
    """
    if not current_user.is_manager:
        return {"message": "Authentication required"}, 401
    form = PropForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        prop = Prop.query.get(id)
        # TODO: Check that prop belongs to a prophouse current_user manages
        if not prop:
            return {"message": "Prop not found"}, 404

        form.populate_obj(prop)
        db.session.commit()
        return jsonify(prop.to_dict_detail())
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# DELETE A PROP
@prop_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_prop(id):
    """
    Delete a prop
    """
    if not current_user.is_manager:
        return {"message": "Authentication required"}, 401
    prop = Prop.query.get(id)
    # TODO: Check that prop belongs to a prophouse current_user manages
    if not prop:
        return {"message": "Prop couldn't be found"}, 404
    db.session.delete(prop)
    db.session.commit()
    return {'message': 'Prop deleted successfully!'}
