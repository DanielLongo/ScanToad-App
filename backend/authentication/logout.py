from flask import session

from .blueprint import authentication
from util import responses, login_required


@authentication.route("/logout", methods=["GET"])
@login_required
def logout():
    # Wipe session
    session.clear()

    return responses.success()
