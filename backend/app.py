from os import getenv

from database import db, create_app


# Initialize app and database
app = create_app(__name__, getenv("DATABASE_URI"), True)
db.create_all(app=app)


@app.route('/')
def hello_world():
    return 'Hello World!'


if __name__ == '__main__':
    app.run()
