from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from sqlalchemy.orm import joinedload
from app.models import db, Setlist, Prop
from app.forms import SetlistForm
from .utils import validation_errors_to_error_messages

setlist_routes = Blueprint('setlist', __name__)


# GET ALL SETLISTS
@setlist_routes.route('')
@login_required
def get_all_setlists():
    """
    Query for all setlists and returns them in a list of setlist dictionaries
    """
    setlists = Setlist.query.options(joinedload(
        Setlist.props)).filter_by(user_id=current_user.id).all()
    return [setlist.to_dict() for setlist in setlists]


# GET SETLIST BY ID
@setlist_routes.route('/<int:id>')
@login_required
def get_setlist(id):
    """
    Query for a setlist by id and returns that setlist in a dictionary
    """
    setlist = Setlist.query.get(id)
    if not setlist or setlist.user_id != current_user.id:
        return {"message": "Setlist not found"}, 404
    return jsonify(setlist.to_dict())


# CREATE A SETLIST
@setlist_routes.route('', methods=['POST'])
@login_required
def create_setlist():
    """
    Query for creating a setlist and returning it as a dictionary
    """
    form = SetlistForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_setlist = Setlist()
        form.populate_obj(new_setlist)
        new_setlist.user_id = current_user.id
        db.session.add(new_setlist)
        db.session.commit()
        return jsonify(
            new_setlist.to_dict()
        )
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# UPDATE A SETLIST
@setlist_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_setlist(id):
    """
    Update a setlist
    """
    form = SetlistForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        setlist = Setlist.query.get(id)
        if not setlist or setlist.user_id != current_user.id:
            return {"message": "Setlist not found"}, 404
        form.populate_obj(setlist)
        db.session.commit()
        return jsonify(setlist.to_dict())
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# DELETE A SETLIST
@setlist_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_setlist(id):
    """
    Delete a setlist
    """
    setlist = Setlist.query.get(id)
    if not setlist or setlist.user_id != current_user.id:
        return {"message": "Setlist not found"}, 404
    db.session.delete(setlist)
    db.session.commit()
    return {'message': 'Setlist deleted successfully!'}


# ADD PROP TO SETLIST
@setlist_routes.route('/<int:setlist_id>/props/<int:prop_id>', methods=['POST'])
@login_required
def setlist_add_prop(setlist_id, prop_id):
    """
    Add prop to setlist
    """
    setlist = Setlist.query.get(setlist_id)
    prop = Prop.query.get(prop_id)

    if not setlist or setlist.user_id != current_user.id:
        return {"message": "Setlist not be found"}, 404
    if not prop:
        return {"message": "Prop not be found"}, 404

    setlist.props.append(prop)
    db.session.commit()
    return jsonify(setlist.to_dict())


# REMOVE PROP FROM SETLIST
@setlist_routes.route('/<int:setlist_id>/props/<int:prop_id>', methods=['DELETE'])
@login_required
def setlist_remove_prop(setlist_id, prop_id):
    """
    Remove prop from setlist
    """
    setlist = Setlist.query.get(setlist_id)
    prop = Prop.query.get(prop_id)

    if not setlist or setlist.user_id != current_user.id:
        return {"message": "Setlist not found"}, 404
    if not prop:
        return {"message": "Prop not found"}, 404

    setlist.props.remove(prop)
    db.session.commit()
    return jsonify(setlist.to_dict())
