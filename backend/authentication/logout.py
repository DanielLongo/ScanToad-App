from flask import session

from .blueprint import authentication
from util import responses


@authentication.route("/logout", methods=["GET"])
def logout():
    # Ensure user logged in
    if "uid" not in session or "type" not in session:
        return responses.error("user not logged in", 401)

    # Wipe session
    session.clear()

    return responses.success()
