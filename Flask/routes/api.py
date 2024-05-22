from flask import Blueprint, jsonify, make_response, request
from Flask.funtions.readExel import ReadDocentesExel
from flask_cors import CORS
import os
api = Blueprint('api', __name__)
#get para presentar los datos
#post para enviar los datos, modificar y iniciar sesion

ALLOWED_EXTENSIONS = {'xlsx'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@api.route('/exel_docente', methods=['POST'])
def upload_file_docente():
    
    f = request.files['file'] 
    rd = ReadDocentesExel(archivo=f)
    print(rd.readExel)
    return jsonify({"message": "Archivo subido correctamente"})
    


