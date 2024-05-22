from flask import Blueprint, jsonify, make_response, request, render_template, redirect, url_for
from controls.functions.exelDocenteAsignate import ExelDocentesAsignate

from flask_cors import CORS
import os
api = Blueprint('api', __name__)

#get para presentar los datos
#post para enviar los datos, modificar y iniciar sesion


@api.route('/')
def home():
    return render_template('login.html')

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
    


