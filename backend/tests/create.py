from flask import request, session

from .blueprint import tests
from database import db, Class, Question, Test
from util import responses, role_required


@tests.route("", methods=["POST"])
@role_required("teacher")
def create(class_id):
    # Ensure JSON body
    if not request.is_json:
        return responses.error("request must be json", 400)

    # Ensure all fields are present
    name = request.json.get("name")
    questions = request.json.get("questions")
    if name is None or name == "" or len(questions) == 0:
        return responses.error("fields 'name' and 'questions' are required", 400)

    # Validate parameter type
    if type(name) != str or type(questions) != list:
        return responses.error("field 'name' must be a string and 'questions' must be an array", 400)

    # Validate name length and questions
    if len(name) > 256:
        return responses.error("field 'name' must be shorter than 256 characters", 400)
    for question in questions:
        # Validate structure
        if type(question) != dict:
            return responses.error("field 'questions' must be array of maps", 400)
        elif "question" not in question or "type" not in question or "data" not in question:
            return responses.error("map in field 'questions' must have fields 'question', 'type', and 'data'", 400)

        # Validate types
        if type(question["question"]) != str or type(question["type"]) != int:
            return responses.error("map in field 'questions' must have field 'question' of type string, "
                                   "field 'type' of type integer, and field 'data' of type string", 400)

        if len(question["question"]) < 4:
            return responses.error("field 'question' in map of field 'questions' "
                                   "must be at least 4 characters long", 400)

    # Ensure class exists
    c = Class.query.filter_by(id=class_id).first()
    if c is None:
        return responses.error("specified class does not exist", 404)

    # Ensure teacher owns class
    if c.teacher_id != session["uid"]:
        return responses.error("user does not own class", 403)

    # Create test
    test = Test(name=name, class_id=class_id)

    # Add questions to test
    test.questions = [Question(question=q["question"], type=q["type"], data=q["data"]) for q in questions]

    # Add test to class
    c.tests.append(test)

    # Commit to database
    db.session.add(c)
    db.session.commit()

    return responses.success()
