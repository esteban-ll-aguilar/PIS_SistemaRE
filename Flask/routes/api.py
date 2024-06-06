from flask import Blueprint, jsonify, make_response, request, render_template, redirect, url_for
from controls.functions.exelDocenteAsignate import ExelDocentesAsignate
from flask_cors import CORS
import os
from controls.cicloDaoContol import CicloDaoControl
from controls.materiaDaoControl import MateriaDaoControl
from controls.asignacionDocenteDaoControl import AsignacionDocenteDaoControl
from controls.estudianteDaoControl import EstudianteDaoControl
from controls.cursaDaoControl import CursaDaoControl

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


@api.route('/lista_estudiantes', methods=['GET'])
def lista_estudiantes_filter():
    data = request.form
    _, idCiclo, _ = CicloDaoControl()._lista.__exist__(1, 'A')
    materiasId = MateriaDaoControl().obtenerMateriaDeCiclo(idCiclo)
    asignacionesId = AsignacionDocenteDaoControl().obtenerAsignacionDeMateria(materiasId)
    a = []
    for i in range(len(asignacionesId)):
        arr, jso = CursaDaoControl()._lista._filter(asignacionesId[i])
        print(jso)
        a.append(jso)
    print(a)
    
    return jsonify(a)


    


