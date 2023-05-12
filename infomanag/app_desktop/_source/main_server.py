from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from os import _exit
from .main_window import update_sv

# local variables
app = Flask('DigServer')
cors = CORS(app, resources={r"/connection": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

exiting = False
code_server=None
url_ext_server=None

@app.route('/')
def hello_world():
    response = jsonify({'res': 'conection failed'})
    return response

@app.route('/connection', methods=['POST','OPTIONS'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def connection():
    global code_server
    request_data = request.get_json()
    if (request_data['code']==code_server):
        global url_ext_server
        url_ext_server = request_data['msg']
        result = update_sv('Conexión con %s'%request_data['msg'], {"key":0})
        result = jsonify({'res': 'conection success'})
        return result, 200
    else:
        result = jsonify({'res': 'conection failed'})
        return result, 500     

@app.route('/data', methods=['POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def server_data():
    request_data = request.get_json()
    if (request_data['code']==code_server):
        result, status = update_sv(request_data['msg'], {
            "key":1, 
            "action":request_data['action'], 
            "data": request_data['data']
            })
        return jsonify(result), status
    else:
        result = jsonify({'res': 'conection failed'})
        return result, 500  

@app.route('/shutdown', methods=['POST'])
def shutdown():
    global code_server
    request_data = request.get_json()
    if (request_data['code']==code_server):
        global exiting
        exiting = True
        return 'Server shutting down...'
    else:
        return 'Code Error'
@app.teardown_request
def teardown(exception):
    if exiting:
        _exit(0)

def run_server(code):
    global code_server
    code_server = code 
    update_sv('Iniciando el servidor...', {"key":0})
    host='127.0.0.51'
    port='5013'
    update_sv('Running Server %s:%s'%(host,port), {"key":0})
    update_sv('', {"key":0})
    app.run(host=host, port=port)
