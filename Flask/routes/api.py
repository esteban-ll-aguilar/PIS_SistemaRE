from flask import Blueprint, jsonify, make_response, request
from controls.functions.exelDocenteAsignate import ExelDocentesAsignate

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
    EDA = ExelDocentesAsignate(f)
    try:
        EDA.saveExel
        EDA.asignarDocente
    except Exception as e:
        print('Error: '+str(e))
        return jsonify({"message": "Error al subir el archivo"})
    return jsonify({"message": "Archivo subido correctamente"})
    


