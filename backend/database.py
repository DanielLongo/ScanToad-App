from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


# Create a Flask application
def create_app(name, database_uri, reset=False):
    app = Flask(name)

    # Configure database
    app.config["SQLALCHEMY_DATABASE_URI"] = database_uri
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # Initialize with request context
    db.init_app(app)
    if reset:
        db.drop_all(app=app)

    return app


# Store teacher information
class Teacher(db.Model):
    __tablename__ = "teachers"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256), nullable=False)
    email = db.Column(db.String(254), unique=True, nullable=False)
    password = db.Column(db.String(98), nullable=False)
    classes = db.relationship("Class", backref="teacher", lazy=True)


# Store student information
class Student(db.Model):
    __tablename__ = "students"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256), nullable=False)
    email = db.Column(db.String(254), unique=True, nullable=False)
    password = db.Column(db.String(98), nullable=False)
    class_id = db.Column(db.Integer, db.ForeignKey("classes.id"), nullable=False)
    grades = db.relationship("Grade", backref="student", lazy=True)


# Store class information
class Class(db.Model):
    __tablename__ = "classes"
    id = db.Column(db.Integer, primary_key=True)
    key = db.Column(db.String(36), nullable=False)
    name = db.Column(db.String(256), nullable=False)
    teacher_id = db.Column(db.Integer, db.ForeignKey("teachers.id"), nullable=True)
    students = db.relationship("Student", backref="class", lazy=True)
    tests = db.relationship("Test", backref="class", lazy=True)


# Store test information
class Test(db.Model):
    __tablename__ = "tests"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256), nullable=False)
    class_id = db.Column(db.Integer, db.ForeignKey("classes.id"), nullable=False)
    questions = db.relationship("Question", backref="test", lazy=True)
    grades = db.relationship("Grade", backref="test", lazy=True)


# Store question information
class Question(db.Model):
    __tablename__ = "questions"
    id = db.Column(db.Integer, primary_key=True)
    test_id = db.Column(db.Integer, db.ForeignKey("tests.id"), nullable=False)
    question = db.Column(db.Text, nullable=False)


# Store grade information
class Grade(db.Model):
    __tablename__ = "grades"
    id = db.Column(db.Integer, primary_key=True)
    test_id = db.Column(db.Integer, db.ForeignKey("tests.id"), nullable=False)
    student_id = db.Column(db.Integer, db.ForeignKey("students.id"), nullable=False)
    total = db.Column(db.Integer, nullable=False)
    correct = db.Column(db.Integer, nullable=False)
