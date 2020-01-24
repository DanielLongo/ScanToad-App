from flask import session

from .blueprint import classes
from database import Class, Student
from util import responses, login_required


@classes.route("", methods=["GET"])
@login_required
def list_method():
    account_type = session["type"]

    if account_type == "teacher":
        return responses.success_with_data([
            c.to_json() for c in Class.query.filter_by(teacher_id=session["uid"]).all()])
    elif account_type == "student":
        return responses.success_with_data(Student.query.filter_by(id=session["uid"]).to_json())

    return responses.error("invalid account type", 500)
