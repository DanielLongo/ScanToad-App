from flask import session

from .blueprint import tests
from database import Class
from util import responses, login_required


@tests.route("", methods=["GET"])
@login_required
def list_method(class_id):
    # Ensure class exists
    c = Class.query.filter_by(id=class_id).first()
    if c is None:
        return responses.error("specified class does not exist", 404)

    # Ensure teacher owns class
    if c.teacher_id != session["uid"]:
        return responses.error("user does not own class", 403)

    return responses.success_with_data([t.to_json() for t in c.tests])
