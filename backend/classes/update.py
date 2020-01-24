from flask import request, session

from .blueprint import classes
from database import db, Class
from util import responses, role_required


@classes.route("/<int:class_id>", methods=["PUT"])
@role_required("teacher")
def update(class_id):
    # Ensure JSON body
    if not request.is_json:
        return responses.error("request must be json", 400)

    # Retrieve body parameters
    name = request.json.get("name")

    # Ensure class exists
    c = Class.query.filter_by(id=class_id).first()
    if c is None:
        return responses.error("specified class does not exist", 404)

    # Ensure teacher owns class
    if c.teacher_id != session["uid"]:
        return responses.error("user does not own class", 403)

    # Update name if available
    if name is not None or name != "":
        # Validate parameter type
        if type(name) != str:
            return responses.error("field 'name' must be a string", 400)

        # Validate length
        if len(name) > 256 or len(name) < 4:
            return responses.error("field 'name' must be between 4 and 256 characters", 400)

        c.name = name

    # Update database
    db.session.add(c)
    db.session.commit()

    return responses.success()
