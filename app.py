import os
import json
from cs50 import SQL
from flask import Flask, flash, redirect, render_template, request, session
from flask_session import Session
from tempfile import mkdtemp
from functools import wraps
from werkzeug.security import check_password_hash, generate_password_hash

# Configure application
app = Flask(__name__)

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

db = SQL('sqlite:///foodle.db')

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if session.get("user_id") is None:
            return redirect("/login")
        return f(*args, **kwargs)
    return decorated_function

@app.after_request
def after_request(response):
    """Ensure responses aren't cached"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response


@app.route('/')
@login_required
def index():
    with app.open_resource('static/foods.txt', mode='r') as file:
        foods = file.read()
        words = foods.split()
        words_json= json.dumps(words)
    return render_template('index.html', words=words_json)

@app.route('/recipe')
@login_required
def recipe():
    return render_template('recipe.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    #Clear any stored session data
    session.clear()

    if request.method == 'POST':
        if not request.form.get('username'):
            flash("Please enter username")
            return redirect('/login')

        elif not request.form.get('password'):
            flash("Please enter password")
            return redirect('/login')


        username = request.form.get('username')
        password = request.form.get('password')

        rows = db.execute('SELECT * FROM users WHERE username = ?', username)
        if len(rows) != 1 or not check_password_hash(rows[0]['hash'], password):
            flash("Invalid username and/or password")
            return redirect('/login')


        session['user_id'] = rows[0]['id']
        return redirect('/')
    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        confirmation = request.form.get('confirmation')

        usernames = db.execute("SELECT username FROM users")
        if not username:
            flash("Please enter a username")
            return redirect('/register')

        for users in usernames:
            if username in users.values():
                flash("Username already exists")
                return redirect('/register')

        if password != confirmation:
            flash('Passwords do not match')
            return redirect('/register')
        elif not password or not confirmation:
            flash('Please enter password')
            return redirect('/register')


        hashedpass = generate_password_hash(password, method='pbkdf2:sha256', salt_length=8)

        db.execute('INSERT INTO users(username, hash) VALUES (?, ?)', username, hashedpass)
        return redirect('/login')
    return render_template('register.html')

@app.route('/logout')
def logout():
    session.clear()

    return redirect('/')


