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


@api.route('/ciclos', methods=['GET'])
def lista_estudiantes_filter():
    ciclo1 = CicloDaoControl()
    ciclo1._lista.sort_models('_ciclo', 1)
    
    return ciclo1.__transform__()


#<int:cicloId> se pasa como parametro en la url
@api.route('/ciclos/materias/<int:cicloId>', methods=['GET'])
def marerias_ciclo(cicloId):
    materias = MateriaDaoControl()
    #en sortmodels se para el 1 para ordenarlo de manera acendente, sino sera desendente
    materias._lista.sort_models('_cicloId', 1)
    return materias._lista._filter(cicloId)


def estudiantes(cicloId):
    materias = MateriaDaoControl()
    #en sortmodels se para el 1 para ordenarlo de manera acendente, sino sera desendente
    materias._lista.sort_models('_cicloId', 1)
    return materias._lista._filter(cicloId)







    


