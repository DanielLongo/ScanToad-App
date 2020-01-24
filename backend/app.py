from flask.cli import load_dotenv
from os import getenv, urandom

from authentication import authentication
from classes import classes
from database import db, create_app
from tests import tests
from util import responses

# Initialize app and database
load_dotenv()
app = create_app(__name__, urandom(64) if getenv("SECRET_KEY") == "" else getenv("SECRET_KEY"),
                 getenv("DATABASE_URI"), getenv("DATABASE_RESET").lower() == "yes")
db.create_all(app=app)

app.register_blueprint(authentication, url_prefix="/auth")
app.register_blueprint(classes, url_prefix="/classes")
app.register_blueprint(tests, url_prefix="/classes/<int:class_id>/tests")


@app.errorhandler(404)
def not_found(_):
    return responses.error("not found", 404)


@app.errorhandler(405)
def method_not_allowed(_):
    return responses.error("method not allowed", 405)


if __name__ == '__main__':
    app.run()
