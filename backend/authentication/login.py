from flask import request, session
from passlib.hash import argon2

from .blueprint import authentication
from database import Student, Teacher
from util import responses


@authentication.route("/login", methods=["POST"])
def login():
    # Ensure JSON body
    if not request.is_json:
        return responses.error("request must be json", 400)

    # Ensure all fields present
    email = request.json.get("email")
    password = request.json.get("password")
    account_type = request.json.get("type")
    if email is None or email == "" or password is None or password == "" or account_type is None or account_type == "":
        return responses.error("fields 'email', 'password', and 'type' are required", 400)

    # Validate parameter type
    if type(email) != str or type(password) != str or type(account_type) != str:
        return responses.error("fields 'email', 'password', and 'type' must be strings", 400)

    # Find user
    if account_type == "teacher":
        user = Teacher.query.filter_by(email=email).first()
    elif account_type == "student":
        user = Student.query.filter_by(email=email).first()
    else:
        return responses.error("field 'type' must be 'teacher' or 'student'", 400)

    # Ensure user exists
    if user is None:
        return responses.error("invalid email or password", 401)

    # Validate password
    if not argon2.verify(password, user.password):
        return responses.error("invalid email or password", 401)

    # Add value to session
    session["uid"] = user.id
    session["type"] = account_type

    return responses.success()
