from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from sqlalchemy.orm import joinedload
from app.models import db, Movie
from app.forms import MovieForm
from .utils import validation_errors_to_error_messages

movie_routes = Blueprint('movie', __name__)


# GET ALL MOVIES
@movie_routes.route('')
def get_all_movies():
    """
    Query for all movies and returns them in a list of movie dictionaries
    """
    movies = Movie.query.options(joinedload(Movie.scenes)).all()
    return [movie.to_dict() for movie in movies]


# GET MOVIE BY ID
@movie_routes.route('/<int:id>')
def get_movie(id):
    """
    Query for a movie by id and returns that movie in a dictionary
    """
    movie = Movie.query.get(id)
    if not movie:
        return {"message": "Movie not found"}, 404
    return jsonify(movie.to_dict())


# CREATE A MOVIE
@movie_routes.route('', methods=['POST'])
@login_required
def create_movie():
    """
    Query for creating a movie and returning it as a dictionary
    """
    form = MovieForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_movie = Movie()
        form.populate_obj(new_movie)
        new_movie.users.append(current_user)
        db.session.add(new_movie)
        db.session.commit()
        return jsonify(
            new_movie.to_dict()
        )
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# UPDATE A MOVIE
@movie_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_movie(id):
    """
    Update a movie
    """
    form = MovieForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        movie = Movie.query.get(id)
        if not movie or current_user not in movie.users:
            return {"message": "Movie not found"}, 404
        form.populate_obj(movie)
        db.session.commit()
        return jsonify(movie.to_dict())
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# DELETE A MOVIE
@movie_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_movie(id):
    """
    Delete a movie
    """
    movie = Movie.query.get(id)
    if not movie or current_user not in movie.users:
        return {"message": "Movie not found"}, 404
    db.session.delete(movie)
    db.session.commit()
    return {'message': 'Movie deleted successfully!'}
