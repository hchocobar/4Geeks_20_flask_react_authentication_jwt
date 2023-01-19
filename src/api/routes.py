"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token  # JWT_extended
from flask_jwt_extended import get_jwt_identity  # JWT_extended
from flask_jwt_extended import jwt_required  # JWT_extended


api = Blueprint('api', __name__)


# Create a route to authenticate your users and return JWTs. 
# The create_access_token() function is used to actually generate the JWT.
@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email != "test@test.com" or password != "test":
        return jsonify({"msg": "Bad username or password"}), 401
    access_token = create_access_token(identity=email)  # JWT_extended
    response_body = {"email": email,
                     "access_token": access_token}
    return response_body, 200


# Protect a route with jwt_required, which will kick out requests without a valid JWT present.
@api.route("/private", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    print("current user:" , current_user)
    response_body = {"message": "login ok",
                     "logged_in_as": current_user}
    return response_body, 200


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {"message": "Hello! I'm a message that came from the backend"}
    return jsonify(response_body), 200