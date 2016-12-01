# -*- coding: utf-8 -*-
from flask import Flask, request, Response, redirect
from functools import wraps

# EB looks for an 'application' callable by default.
application = Flask(__name__)

application.config.from_object('config')

def check_auth(username, password):
    """This function is called to check if a username /
    password combination is valid.
    """
    return username == application.config['USERNAME'] and password == application.config['PASSWORD']

def authenticate():
    """Sends a 401 response that enables basic auth"""
    return Response(
    'Could not verify your access level for that URL.\n'
    'You have to login with proper credentials', 401,
    {'WWW-Authenticate': 'Basic realm="Login Required"'})

def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth = request.authorization
        if not auth or not check_auth(auth.username, auth.password):
            return authenticate()
        return f(*args, **kwargs)
    return decorated


@application.route('/', methods=['GET', 'POST'])
@application.route('/index', methods=['GET', 'POST'])
@requires_auth
def index() :
    return redirect(application.config['REDIRECT_URL'])

# run the app.
if __name__ == "__main__":
    # Setting debug to True enables debug output. This line should be
    # removed before deploying a production app.
    application.debug = True
    application.run()
