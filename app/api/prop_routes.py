from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from sqlalchemy.orm import joinedload
from app.models import db, Prop
from app.forms import PropForm
from .utils import validation_errors_to_error_messages


prop_bp = Blueprint('prop', __name__)


# GET ALL PROPS
@prop_bp.route('')
def get_all_props():
    """
    Query for all props and returns them in a list of prop dictionaries
    """
    props = Prop.query.options(joinedload(Prop.category)).all()
    return [prop.to_dict() for prop in props]


# GET PROP BY ID
@prop_bp.route('/<int:id>')
def get_prop(id):
    """
    Query for a prop by id and returns that prop in a dictionary
    """
    prop = Prop.query.get(id)
    if prop:
        return jsonify(prop.to_dict())
    else:
        return jsonify({
            'success': False,
            'message': 'Prop not found'
        })


# CREATE A PROP
@prop_bp.route('', methods=['POST'])
@login_required
def create_prop():
    """
    Query for creating a prop and returning it as a dictionary
    """
    if not current_user.is_manager:
        return {'errors': [{"message": "Authentication required"}]}, 401

    form = PropForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_prop = Prop()
        form.populate_obj(new_prop)
        new_prop.prophouse_id = current_user.prophouse_id
        db.session.add(new_prop)
        db.session.commit()
        return jsonify(
            new_prop.to_dict()
        )
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# UPDATE A PROP
@prop_bp.route('/<int:id>', methods=['PUT'])
@login_required
def edit_prop(id):
    """
    Update a prop
    """
    if not current_user.is_manager:
        return {'errors': [{"message": "Authentication required"}]}, 401
    form = PropForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        prop = Prop.query.get(id)

        if not prop:
            return {'errors': [{"message": "Prop couldn't be found"}]}, 404

        form.populate_obj(prop)
        db.session.commit()
        return jsonify(prop.to_dict())
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# DELETE A PROP
@prop_bp.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_prop(id):
    """
    Delete a prop
    """
    if not current_user.is_manager:
        return {'errors': [{"message": "Authentication required"}]}, 401
    prop = Prop.query.get(id)
    if not prop:
        return {'errors': [{"message": "Prop couldn't be found"}]}, 404
    db.session.delete(prop)
    db.session.commit()
    return jsonify({
        'success': True,
        'message': 'Prop deleted successfully!'
    })
