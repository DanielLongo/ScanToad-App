from flask import session

from .blueprint import classes
from database import db, Class
from util import responses, role_required


@classes.route("/<int:class_id>", methods=["DELETE"])
@role_required("teacher")
def delete(class_id):
    # Ensure class exists
    c = Class.query.filter_by(id=class_id).first()
    if c is None:
        return responses.error("specified class does not exist", 404)

    # Ensure teacher owns class
    if c.teacher_id != session["uid"]:
        return responses.error("user does not own class", 403)

    # Delete from database
    db.session.delete(c)
    db.session.commit()

    return responses.success()
