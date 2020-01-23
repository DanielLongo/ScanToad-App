from flask import request
from passlib.hash import argon2

from .blueprint import authentication
from database import db, Class, Student, Teacher
from util import responses


@authentication.route("/register", methods=["POST"])
def register():
    # Ensure JSON body
    if not request.is_json:
        return responses.error("request must be json", 400)

    # Ensure all fields present
    email = request.json.get("email")
    password = request.json.get("password")
    name = request.json.get("name")
    account_type = request.json.get("type")
    class_key = request.json.get("class_key")
    if email is None or email == "" or password is None or password == "" or \
            name is None or name == "" or account_type is None or account_type == "":
        return responses.error("fields 'email', 'password', 'name', and 'type' are required", 400)
    elif account_type == "student" and (class_key is None or class_key == ""):
        return responses.error("field 'teacher_name' is required for student registration", 400)

    # Validate parameter type
    if type(email) != str or type(password) != str or type(name) != str or type(account_type) != str:
        return responses.error("fields 'email', 'password', 'name', and 'type' must be strings", 400)

    # Validate email, password, and name length
    if len(email) > 254 or len(email) < 5:
        return responses.error("field 'email' must be between 5 and 254 characters long", 400)
    elif len(name) > 256 or len(name) < 3:
        return responses.error("field 'name' must be between 3 and 256 characters long", 400)
    elif len(password) < 12:
        return responses.error("field 'password' must be at least 8 characters", 400)

    # Operate on different account types
    if account_type == "teacher":
        return register_teacher(name, email, password)
    elif account_type == "student":
        return register_student(name, email, password, class_key)
    else:
        return responses.error("field 'type' must be 'teacher' or 'student'", 400)


def register_teacher(name, email, password):
    teacher = Teacher.query.filter_by(email=email).first()
    if teacher is not None:
        return responses.error("teacher with specified email already exists", 409)

    teacher = Teacher(name=name, email=email)

    # Hash password
    teacher.password = argon2.using(salt_len=32).hash(password)

    # Commit to database
    db.session.add(teacher)
    db.session.commit()

    return responses.success()


def register_student(name, email, password, key):
    student = Student.query.filter_by(email=email).first()
    if student is not None:
        return responses.error("student with specified email already exists", 409)

    c = Class.query.filter_by(key=key).first()
    if c is None:
        return responses.error("specified class does not exist", 400)

    student = Student(name=name, email=email, class_id=c.id)

    # Hash password
    student.password = argon2.using(salt_len=32).hash(password)

    c.students.append(student)

    # Commit to database
    db.session.add(c)
    db.session.commit()

    return responses.success()
