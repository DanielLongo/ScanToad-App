from flask import session

from .blueprint import classes
from database import Class, Student
from util import responses, login_required


@classes.route("/<int:class_id>")
@login_required
def read(class_id):
    # Ensure class exists
    c = Class.query.filter_by(id=class_id).first()
    if c is None:
        return responses.error("specified class does not exist", 404)

    # Ensure user part of/owns class
    if session["type"] == "teacher" and c.teacher_id != session["uid"]:
        return responses.error("user does not own class", 403)
    elif session["type"] == "student":
        student = Student.query.filter_by(id=session["uid"]).first()
        if student is None:
            session.clear()
            return responses.error("logged in user no longer exists", 403)
        elif student.class_id != c.id:
            return responses.error("user not part of specified class", 403)

    return responses.success_with_data(c.to_json())
