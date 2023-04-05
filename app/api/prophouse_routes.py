from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Prophouse
from app.forms import ProphouseForm
from .utils import validation_errors_to_error_messages


prophouse_routes = Blueprint('prophouse', __name__)


# GET ALL PROPHOUSES
@prophouse_routes.route('')
def get_all_prophouse():
    """
    Query for all prophouses returns them in a list of prop dictionaries
    """
    prophouses = Prophouse.query.all()
    return jsonify([prophouse.to_dict() for prophouse in prophouses])


# GET PROPHOUSE BY ID
@prophouse_routes.route('/<int:id>')
def get_prophouse(id):
    """
    Query for a prophouse by id and returns that prop in a dictionary
    """
    prophouse = Prophouse.query.get(id)
    if prophouse:
        return jsonify(prophouse.to_dict())
    else:
        return {'message': 'Prophouse not found'}, 404


# UPDATE A PROPHOUSE
@prophouse_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_prophouse(id):
    """
    Update a prophouse
    """
    if not current_user.is_manager:
        return {"message": "Authentication required"}, 401
    form = ProphouseForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        prophouse = Prophouse.query.get(id)
        if not prophouse:
            return {"message": "Prophouse not found"}, 404
        form.populate_obj(prophouse)
        db.session.commit()
        return jsonify(prophouse.to_dict())
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
