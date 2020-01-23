from flask import jsonify


# Generate success JSON response
def success():
    return jsonify({"status": "success"})


# Generate success JSON response with extra data
def success_with_data(data):
    return jsonify({"status": "success", "data": data})


# Generate error JSON response
def error(reason, code):
    return jsonify({"status": "error", "reason": reason}), code
