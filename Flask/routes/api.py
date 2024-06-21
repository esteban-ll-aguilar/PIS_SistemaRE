from flask import Blueprint, jsonify, make_response, request, render_template, redirect, url_for
from controls.functions.exelDocenteAsignate import ExelDocentesAsignate
from flask_cors import CORS
import os
from controls.materiaDaoControl import MateriaDaoControl
from controls.estudianteDaoControl import EstudianteDaoControl
from controls.cursaDaoControl import CursaDaoControl
from controls.usuarioDaoControl import UsuarioDaoControl

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


""" @api.route('/ciclos', methods=['GET'])
def lista_estudiantes_filter():
    ciclo1 = CicloDaoControl()
    ciclo1._lista.sort_models('_ciclo', 1)
    
    return ciclo1.__transform__()
 """

#<int:cicloId> se pasa como parametro en la url
@api.route('/ciclos/materias/<int:ciclo>', methods=['GET'])
def marerias_ciclo(ciclo):
    materias = MateriaDaoControl()
    #en sortmodels se para el 1 para ordenarlo de manera acendente, sino sera desendente
    materias._lista.search_model(ciclo, '_ciclo')
    return materias.to_dict_list()


@api.route('/estudiantes/materia/<int:materia>', methods=['GET'])
def estudiantes_materia(materia):
    cursa = CursaDaoControl()
    estudiantes = UsuarioDaoControl()
    m = MateriaDaoControl()
    m = m._lista.search_model(materia, '_id')
    array = cursa._lista.search_model(1, '_periodoAcademicoId')
    array = cursa.lista.search_model(materia, '_materiaId',type=0, method=1)
    aux = []
    for i in range(0, len(array)):
        x = estudiantes._lista.search_model(array[i]._estudianteCedula, '_cedula')
        aux.append(x[0])
    estudiantes._lista.toList(aux)
    estudiantes.lista.sort_models('_nombres', 0)
    return make_response(jsonify({"cursa": array[0].serializable, "estudiante": estudiantes.to_dict_list(), "materia": m[0].serializable})) 


@api.route('/docente/materias/<string:docente>', methods=['GET'])
def materias_docente(docente):
    cursa = CursaDaoControl()
    array = cursa._lista.search_model(1, '_periodoAcademicoId')
    array = cursa.lista.search_model(docente, '_docenteCedula',type=0)
    m = MateriaDaoControl()
    
    materiasId = []
    for i in range(1, len(array)):
        x = m._lista.search_model(array[i]._materiaId, '_id')
        if not x[0]._id in materiasId:
            materiasId.append(x[0]._id)
    
    aux = []
    for i in range(0, len(materiasId)):
        x = m._lista.search_model(materiasId[i], '_id')
        aux.append(x[0])
        
    m.lista.toList(aux)
    return make_response(jsonify({"materias": m.to_dict_list()}))







    


