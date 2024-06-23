from flask import Blueprint, jsonify, make_response, request, render_template, redirect, url_for
from controls.functions.exelDocenteAsignate import ExelDocentesAsignate
from flask_cors import CORS
import os
from controls.materiaDaoControl import MateriaDaoControl
from controls.estudianteDaoControl import EstudianteDaoControl
from controls.cursaDaoControl import CursaDaoControl
from controls.usuarioDaoControl import UsuarioDaoControl
from controls.funcionDocenteDaoControl import FuncionDocenteDaoControl
from controls.unidadDaoControl import UnidadDaoControl
from controls.functions.createmodel import CreateModel
from controls.functions.readNotasExel import ReadNotasExel
api = Blueprint('api', __name__)

#get para presentar los datos
#post para enviar los datos, modificar y iniciar sesion






@api.route('/login', methods=['POST'])
def login():
    data = request.json
    print(data)
    user = UsuarioDaoControl()
    dodente = user._lista.search_model(data['email'], '_correo')
    if dodente[0]._correo == data['email'] and dodente[0]._contrasena == data['password']:
        funcion = FuncionDocenteDaoControl()
        funcion._lista.search_model(dodente[0]._cedula, '_docenteUserCedula')
        
        return make_response(jsonify({"message": "Usuario encontrado", "docente": user.to_dict_list(), "funcion": funcion.to_dict_list()}))
    else:
        return make_response(jsonify({"message": "Usuario no encontrado"}))
    
    
    
@api.route('/usuario/<string:cedula>')
def usuario(cedula):
        user = UsuarioDaoControl()
        user._lista.search_model(cedula, '_cedula')
        return make_response(jsonify({"usuario": user.to_dict_list()}))
        
#/estudiantes/eliminar/cursa/estudiante/${estudiante.user_cedula}/materia/${materia.idmateria}
@api.route('/estudiantes/eliminar/cursa/estudiante/<string:estudiante>/materia/<int:materia>', methods=['DELETE'])
def eliminar_cursa(estudiante, materia):
    cursa = CursaDaoControl()
    cursa._lista.search_model(estudiante, '_estudianteCedula')
    cursa.lista.search_model(materia, '_materiaId', type=0)
    data = cursa.to_dict_list()
    cursa.delete(data[0])
    
    return jsonify({"message": "Eliminado correctamente",})


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



#[docente, administrador]
#para el arraty en donde contenga un dodente y administrador retorne a una pagina, 
@api.route('/estudiantes/calificaciones/materia/<int:materiaId>/unidad/<int:unidadId>', methods=['GET'])
def materias_unidad(materiaId,unidadId):
    unidad = UnidadDaoControl()
    cursa = CursaDaoControl()
    estudiantes = UsuarioDaoControl()
    m = MateriaDaoControl()
    
    unidad._lista.search_model(unidadId, '_id')
    m = m._lista.search_model(materiaId, '_id')
    array = cursa._lista.search_model(1, '_periodoAcademicoId')
    array = cursa.lista.search_model(materiaId, '_materiaId',type=0, method=1)
    cursa = cursa.lista.sort_models('_id', 0)
    aux = []
    for i in range(0, len(array)):
        x = estudiantes._lista.search_model(array[i]._estudianteCedula, '_cedula')
        aux.append(x[0])
    
    estudiantes._lista.toList(aux)
    estudiantes.lista.sort_models('_apellidos', 0)
    return jsonify({"unidad": unidad.to_dict_list(), "estudiantes": estudiantes.to_dict_list()})


@api.route('/asignar/calificaciones/materia/<int:materiaId>/unidad/<int:unidadId>/nunidad/<int:nunidad>', methods=['POST'])
def asignar_calificacion(materiaId,unidadId, nunidad):
    data = request.files
    #Leer excel 
    print(data['file'].filename)
    rdexel = ReadNotasExel(data['file'], nunidad)
    rdexel.readExel
    
    
    
    return jsonify({"message": "Calificacion asignada correctamente"})





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
    estudiantes.lista.sort_models('_apellidos', 0)
    return make_response(jsonify({"cursa": array[0].serializable, "estudiante": estudiantes.to_dict_list(), "materia": m[0].serializable})) 


@api.route('/materia/crear/unidad/<int:materiaId>', methods=['POST'])
def crear_unidad(materiaId):
    data = request.json
    unidad = UnidadDaoControl()
    if unidad._lista.isEmpty:
        CreateModel().createUnidad(data, materiaId=materiaId)
        return make_response(jsonify({"message": "Unidad creada correctamente"}))
    
    unidad._lista.search_model(materiaId, '_materiaId')
    existeUnidad, _,_ =unidad.lista.__exist__(data['Unidad'], id=materiaId, nunidad=int(data['nUnidad']))
    if not existeUnidad:
        CreateModel().createUnidad(data, materiaId=materiaId)
        return make_response(jsonify({"message": "Unidad creada correctamente"}))
    return make_response(jsonify({"message": "Unidad ya existe"}), 400)
    

@api.route('/materia/unidad/<int:materiaId>', methods=['GET'])
def ver_unidades(materiaId):
    unidad = UnidadDaoControl()
    unidad._lista.search_model(materiaId, '_materiaId')
    return make_response(jsonify({"unidades": unidad.to_dict_list()}))
    
    




@api.route('/docente/materias/<string:docente>', methods=['GET'])
def materias_docente(docente):
    cursa = CursaDaoControl()
    cursa._lista.search_model(1, '_periodoAcademicoId')
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







    


