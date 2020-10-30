from flask import Flask
from flask import render_template
from flask import request
from flask_cors import CORS, cross_origin

from webg import w2json

app=Flask(__name__)
app.config['SECRET_KEY'] = 'the quick brown fox jumps over the lazy   dog'
app.config['CORS_HEADERS'] = 'Content-Type'

cors = CORS(app, resources={r"/json": {"origins": "http://localhost:5000"}})


@app.route('/')
def hello():
    return render_template('index.html')

@app.route('/json', methods=['GET'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def get_json():
    url = request.args.get('jsdata')
    return w2json(url)


if __name__=="__main__":
    app.run(debug=True)