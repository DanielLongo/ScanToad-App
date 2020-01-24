from flask import session
from functools import wraps

from .responses import error


# Require user to be logged in on a given route
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if "uid" not in session or "type" not in session:
            return error("no session present", 401)
        return f(*args, **kwargs)
    return decorated_function


# Require a given role to access route
def role_required(role="any"):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            if "uid" not in session or "type" not in session:
                return error("no session present", 401)
            elif role != "any" and session["type"] != role:
                return error(f"only {role} allowed to access route", 403)
            return f(*args, **kwargs)
        return decorated_function
    return decorator
