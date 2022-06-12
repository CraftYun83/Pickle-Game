from flask import Flask, render_template, send_from_directory

app = Flask(__name__, static_folder='Images')

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/death")
def death():
    return render_template("death.html")

@app.route('/<path:filename>')  
def send_file(filename):  
    return send_from_directory(app.static_folder, filename)