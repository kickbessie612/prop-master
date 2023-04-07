from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from sqlalchemy.orm import joinedload
from app.models import db, Scene
from app.forms import SceneCreateForm, SceneUpdateForm
from .utils import validation_errors_to_error_messages

scene_routes = Blueprint('scene', __name__)


# GET ALL SCENES
@scene_routes.route('')
def get_all_scenes():
    """
    Query for all scenes and returns them in a list of scene dictionaries
    """
    scenes = Scene.query.options(joinedload(
        Scene.props), joinedload(Scene.movie)).all()
    return [scene.to_dict() for scene in scenes]


# GET SCENE BY ID
@scene_routes.route('/<int:id>')
def get_scene(id):
    """
    Query for a scene by id and returns that scene in a dictionary
    """
    scene = Scene.query.get(id)
    if not scene:
        return {"message": "Scene not found"}, 404
    return jsonify(scene.to_dict())


# CREATE A SCENE
@scene_routes.route('', methods=['POST'])
@login_required
def create_scene():
    """
    Query for creating a scene and returning it as a dictionary
    """
    form = SceneCreateForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # TODO: add validation to make sure you're adding scene to a movie owned by the current user
    if form.validate_on_submit():
        new_scene = Scene()
        form.populate_obj(new_scene)
        db.session.add(new_scene)
        db.session.commit()
        return jsonify(
            new_scene.to_dict()
        )
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# UPDATE A SCENE
@scene_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_scene(id):
    """
    Update a scene
    """
    form = SceneUpdateForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        scene = Scene.query.get(id)
        if not scene or current_user not in scene.movie.users:
            return {"message": "Scene not found"}, 404
        form.populate_obj(scene)
        db.session.commit()
        return jsonify(scene.to_dict())
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# DELETE A SCENE
@scene_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_scene(id):
    """
    Delete a scene
    """
    scene = Scene.query.get(id)
    if not scene or current_user not in scene.movie.users:
        return {"message": "Scene not found"}, 404
    db.session.delete(scene)
    db.session.commit()
    return {'message': 'Scene deleted successfully!'}
