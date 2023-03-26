from flask import Blueprint
from app.models import Category
from .utils import validation_errors_to_error_messages


category_routes = Blueprint('category', __name__)


# GET ALL CATEGORIES
@category_routes.route('')
def get_all_categories():
    """
    Query for all categories and returns them in a list of category dictionaries
    """
    categories = Category.query.all()
    return [category.to_dict() for category in categories]
