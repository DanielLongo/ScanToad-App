from flask import session

from .blueprint import tests
from database import Class, Student, Test
from util import responses, login_required


@tests.route("/<int:test_id>", methods=["GET"])
@login_required
def read(class_id, test_id):
    # Ensure class exists
    c = Class.query.filter_by(id=class_id).first()
    if c is None:
        return responses.error("specified class does not exist", 404)

    # Ensure teacher owns class or student in class
    if session["type"] == "teacher" and c.teacher_id != session["uid"]:
        return responses.error("user does not own class", 403)
    elif session["type"] == "student":
        s = Student.query.filter_by(id=session["uid"]).first()
        if s is None:
            return responses.error("authenticated user no longer exists", 400)
        elif s.class_id != class_id:
            return responses.error("user not in class", 403)

    # Ensure test exists
    test = Test.query.filter_by(id=test_id).first()
    if test is None:
        return responses.error("specified test does not exist", 404)

    # Ensure test part of class
    if test.class_id != c.id:
        return responses.error("test not part of specified test", 403)

    return responses.success_with_data(test.to_json())
