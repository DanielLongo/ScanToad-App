from flask import request, session
from uuid import uuid4

from .blueprint import classes
from database import db, Class, Teacher
from util import responses, role_required


@classes.route("", methods=["POST"])
@role_required("teacher")
def create():
    # Ensure JSON body
    if not request.is_json:
        return responses.error("request must be json", 400)

    # Ensure all fields are present
    name = request.json.get("name")
    if name is None or name == "":
        return responses.error("field 'name' is required", 400)

    # Validate parameter type
    if type(name) != str:
        return responses.error("field 'name' must be a string", 400)

    # Validate name length
    if len(name) > 256 or len(name) < 4:
        return responses.error("field 'name' must be between 4 and 256 characters", 400)

    # Retrieve teacher from database
    teacher = Teacher.query.filter_by(id=session["uid"]).first()
    if teacher is None:
        session.clear()
        return responses.error("logged in user no longer exists", 403)

    c = Class(teacher_id=teacher.id, name=name, key=str(uuid4()))
    teacher.classes.append(c)

    # Commit to database
    db.session.add(teacher)
    db.session.commit()

    return responses.success()
