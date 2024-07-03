from flask import Blueprint, jsonify, make_response, request, render_template, redirect, url_for
from controls.functions.exelDocenteAsignate import ExelDocentesAsignate
from flask_cors import CORS
import os
import numpy as np
from controls.materiaDaoControl import MateriaDaoControl
from controls.estudianteDaoControl import EstudianteDaoControl
from controls.cursaDaoControl import CursaDaoControl
from controls.usuarioDaoControl import UsuarioDaoControl
from controls.funcionDocenteDaoControl import FuncionDocenteDaoControl
from controls.unidadDaoControl import UnidadDaoControl
from controls.functions.createmodel import CreateModel
from controls.functions.readNotasExel import ReadNotasExel
from controls.rubricaCalificacionDaoControl import RubricaCalificacionDaoControl
from controls.calificacionDaoControl import CalificacionDaoControl
from controls.periodoAcademicoDaoControl import PeriodoAcademicoDaoControl
from controls.functions.exelDocenteAsignate import ExelDocentesAsignate
from controls.functions.exelCursaAsignate import ExelCursaAsignate
import matplotlib.pyplot as plt # gráfica
import io # gráfica
import base64 # gráfica 
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
        print(user.to_dict_list())
        return make_response(jsonify({"usuario": user.to_dict_list()}))
        



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
    calificacion = CalificacionDaoControl()
    rubrica = RubricaCalificacionDaoControl()
    m = MateriaDaoControl()
    #buscamos la unidad y la materia
    unidad._lista.search_model(unidadId, '_id')  #<-- Utilizando métodos de búsqueda para encontrar las unidades y materias.
    m = m._lista.search_model(materiaId, '_id')
    #buscamos los estudiantes que estan en la materia
    try:
        listcursa = cursa._lista.search_model(1, '_periodoAcademicoId')
        #obtenenos una lista de los estudiantes que estan en la materia
        listcursa = cursa.lista.search_model(materiaId, '_materiaId',type=0, method=1)
        #buscamos las calificaciones de la unidad
        calificacion._lista.search_model(unidadId, '_unidadId', type=0)
        calificacion.lista.sort_models('_cursaId', 0)
        #obtener los estudiantes de la materia
        listEstudiante = []
        for i in range(0, len(listcursa)):
            estudiante = estudiantes._lista.search_model(listcursa[i]._estudianteCedula, '_cedula')
            listEstudiante.append(estudiante[0])  
        estudiantes._lista.toList(listEstudiante)
        estudiantes.lista.sort_models('_primerApellido', 0)
        cursa.lista.toList(listcursa)
        cursa.lista.sort_models('_id', 0)
        #convertit la lista ordenada en un array
        listEstudiante = estudiantes.lista.toArray
        dict = cursa.to_dict_list()
        #obtener lo id de los cursa en de los estudiantes
        auxcursaid = []
        for i in range(0,len(listEstudiante)):
            for j in range(0, len(dict)):
                if listEstudiante[i]._cedula == dict[j]['estudiante_user_cedula']:
                    auxcursaid.append(dict[j]['idcursa'])        
        #obtener las calificaciones de los estudiantes
        listCalificacion = []
        for i in range(0, len(auxcursaid)):
            calif = calificacion._lista.search_model(auxcursaid[i], '_cursaId')
            listCalificacion.append(calif)
        rubricaLista = rubrica._lista.toArray
        aux = []
        for i in range(0, len(listCalificacion)):
            arr = []
            for j in range(0, len(listCalificacion[i])):
                if listCalificacion[i][j]._unidadId == unidadId:
                    arr.append(listCalificacion[i][j])
            aux.append(arr)
        listCalificacion = aux
        for i in range(0, len(listCalificacion)):
            for j in range(0, len(listCalificacion[i])):
                for k in range(0, len(rubricaLista)):
                    if listCalificacion[i][j]._rubricaCalificacionId == rubricaLista[k]._id:
                        listCalificacion[i][j]._rubricaCalificacionId = rubricaLista[k]._descripcion
                        break
        #print(listCalificacion)
        for i in range(0, len(listCalificacion)):
            for j in range(0, len(listCalificacion[i])):
                listCalificacion[i][j] = listCalificacion[i][j].serializable
        
        return jsonify({"unidad": unidad.to_dict_list(), "estudiantes": estudiantes.to_dict_list(), "calificaciones": listCalificacion, "rubrica": rubrica.to_dict_list()})
    except Exception as e:
        print('Error: '+str(e))
        return jsonify({"unidad": unidad.to_dict_list(), "estudiantes": estudiantes.to_dict_list(), "calificaciones": [], "rubrica": rubrica.to_dict_list()})




@api.route('/asignar/calificaciones/materia/<int:materiaId>/unidad/<int:unidadId>/nunidad/<int:nunidad>', methods=['POST'])
def asignar_calificacion(materiaId,unidadId, nunidad):
    data = request.files
    #Leer excel 
    print(data)
    rdexel = ReadNotasExel(data['file'], 
                           unidad=nunidad)
    notas, columnsNotas = rdexel.readExel
    #para asignar las notas, llamamos al cursa
    cursa = CursaDaoControl()
    cursa._lista.search_model(1, '_periodoAcademicoId')
    cursa.lista.search_model(materiaId, '_materiaId', type=0, method=1)
    cursa.lista.sort_models('_id', 0)
    cursa = cursa.lista.toArray
    if len(cursa) != len(notas):
        print(len(cursa))
        print(len(notas))
        print("ERROR MI AMIGASO")
        return jsonify({"message": "Error al asignar las calificaciones, no coinciden las notas con los estudiantes"})
    #1- Crear rubrica de calificacion en caso de que no exista, de paso almacenamos su identificador
    identificatorRub = []
    for i in range(0, len(columnsNotas)):
        if RubricaCalificacionDaoControl()._lista.isEmpty:
            CreateModel().createRubricaCalificacion(columnsNotas[i])
        existeRubrica, idrub, _ = RubricaCalificacionDaoControl()._lista.__exist__(columnsNotas[i])
        if not existeRubrica:
            CreateModel().createRubricaCalificacion(columnsNotas[i])
        else:
            identificatorRub.append(idrub)
    #si las cedulas coninciden, es porque encontramos a nuestro estudiante por tanto asignamos la calificacion
    for i in range(0, len(cursa)):
        if cursa[i]._estudianteCedula == notas[i]['Cedula']:
            for j in range(0, len(columnsNotas)):
                nota = notas[i][columnsNotas[j]]
                CreateModel().createCalificacion(cursa[i]._id, identificatorRub[j], unidadId, "{:.2f}".format(nota))
    
    return jsonify({"message": "Calificacion asignada correctamente"})



@api.route('/ciclos') # <-- este nos devuelve la lista de los ciclos que tenemos.
def ciclos():
    materias = MateriaDaoControl()
    aux = materias._lista.sort_models('_ciclo', 0)
    ciclos = []
    for i in range(1, len(aux)):
        if aux[i-1]._ciclo != aux[i]._ciclo:
            ciclos.append(aux[i-1]._ciclo)  
    print(ciclos)
    return jsonify({"ciclos": ciclos})



#<int:cicloId> se pasa como parametro en la url
@api.route('/ciclos/materias/<int:ciclo>', methods=['GET'])# <-- aplica la búsqueda y nos retorna la materia en específico.77
def marerias_ciclo(ciclo):
    materias = MateriaDaoControl()
    #en sortmodels se para el 1 para ordenarlo de manera ascendente, sino sera desendente
    materias._lista.search_model(ciclo, '_ciclo')
    return materias.to_dict_list()


@api.route('/estudiantes/materia/<int:materia>', methods=['GET'])
def estudiantes_materia(materia):
    cursa = CursaDaoControl()
    estudiantes = UsuarioDaoControl()
    unidades = UnidadDaoControl()
    try:
        unidades._lista.search_model(materia, '_materiaId')
        unidades = unidades.to_dict_list()
    except Exception as e:
        print('Error: '+str(e))
        unidades = []     
    m = MateriaDaoControl()
    m = m._lista.search_model(materia, '_id')
    array = cursa._lista.search_model(ultimo_periodoId(), '_periodoAcademicoId')
    array = cursa.lista.search_model(materia, '_materiaId',type=0, method=1)
    aux = []
    for i in range(0, len(array)):
        x = estudiantes._lista.search_model(array[i]._estudianteCedula, '_cedula')
        aux.append(x[0])
    estudiantes._lista.toList(aux)
    estudiantes.lista.sort_models('_primerApellido', 0)
    print(estudiantes.to_dict_list())
    return make_response(jsonify({"cursa": array[0].serializable, "estudiante": estudiantes.to_dict_list(), "materia": m[0].serializable, "unidades": unidades})) 




@api.route('/materia/crear/unidad/<int:materiaId>', methods=['POST'])
def crear_unidad(materiaId):
    data = request.json
    print(data)
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
    cursa._lista.search_model(ultimo_periodoId(), '_periodoAcademicoId')
    array = cursa.lista.search_model(docente, '_docenteCedula',type=0)
    m = MateriaDaoControl()
    materiasId = []
    auxmateriasID = []
    for i in range(0, len(array)):
        if not auxmateriasID.__contains__(array[i]._materiaId):
            auxmateriasID.append(array[i]._materiaId)
            print(array[i]._materiaId)
            
    for i in range(0, len(auxmateriasID)):
        x = m._lista.search_model(auxmateriasID[i], '_id')
        materiasId.append(x[0])    
        
    m.lista.toList(materiasId)
    return make_response(jsonify({"materias": m.to_dict_list()}))

def ultimo_periodoId():
    periodo = PeriodoAcademicoDaoControl()._list().toArray
    idultimoperiodo = periodo[len(periodo)-1]._id
    return idultimoperiodo




@api.route('/funcion_docente', methods=['GET'])
def funcion_docente():
    funcion = FuncionDocenteDaoControl()
    usuarios = UsuarioDaoControl()
    funcion = funcion._lista.toArray
    aux = "["
    for i in range(0, len(funcion)):
        x = usuarios._lista.search_model(funcion[i]._docenteUserCedula, '_cedula')
        for j in range(0, len(x)):
            aux += '{"cedula": "'+x[j]._cedula+'", "nombres": "'+x[j]._nombres+'", "apellidos": "'+x[j]._apellidos+'", "funcion": "'+funcion[i]._funcion+'"}'
            if j < len(x)-1:
                aux += ","
    usuarios.lista.toList(aux)
    print(len(usuarios.lista.toArray))
        
    return make_response(jsonify({"docentes": usuarios.to_dict_list()}))




@api.route('/crear_estudiantes_docentes', methods=['POST'])# <-- Se permite la carga tanto de docentes como estudiantes (solo se crean cuando no existen.)
def crear_estudiantes_docentes():
    files = request.files
    data = request.form 
    print(files['docenteFile'])
    
    existPeriodo, periodoAcId, _ = PeriodoAcademicoDaoControl()._lista.__exist__(data['nombrePeriodo'])    
    if PeriodoAcademicoDaoControl()._lista.isEmpty or not existPeriodo:
        periodoAcId = CreateModel().createPeriodoAcademico(data)
    #if existPeriodo:
    #   return make_response(jsonify({"message": "Periodo academico ya existe"}), 400)
    # crear periodo academico
    """   eda.saveExel
    eca.saveExel
    eca.asignarEstudiante
    
    eca.crearCursa(1) """
    #asignar docentes
    docentes = ExelDocentesAsignate(files['docenteFile'])  
    estudianteCursa = ExelCursaAsignate(files['estudianteFile'])
    docentes.saveExel
    estudianteCursa.saveExel
    estudianteCursa.asignarEstudiante
    estudianteCursa.crearCursa(periodoAcId)
    return jsonify({"message": "Estudiantes y docentes asignados correctamente"})
    


def ultimo_periodoId():   #<--   el periodo actual donde se encuentra el actual proceso de seguimiento.
    periodo = PeriodoAcademicoDaoControl()._list().toArray
    idultimoperiodo = periodo[len(periodo)-1]._id
    return idultimoperiodo




@api.route('/rendimiento/ciclo/<int:cicloId>', methods=['GET'])
def rendimiento_ciclo(cicloId):
    cursa = CursaDaoControl()
    estudiantes = UsuarioDaoControl()
    rubrica = RubricaCalificacionDaoControl()
    calificacion = CalificacionDaoControl()
    unidades = UnidadDaoControl()

    periodoId = ultimo_periodoId()
    
    
    # Obtener materias del ciclo
    materias = MateriaDaoControl()
    materias._lista.search_model(cicloId, '_ciclo')
    print(materias.to_dict_list())
    print("ciclos cargados...", "\n\n")  # hasta aquí esta bien.
    
    

    for materia in materias:
        cursa.lista.search_model(materia._id, '_materiaId', type=0)
        cursaIds = [c._id for c in cursa.lista.toArray]
        
        for cursaId in cursaIds:
            calificaciones = calificacion._lista.search_model(cursaId, '_cursaId')
            promedio = np.mean([float(calif._calificacion) for calif in calificaciones])
            if materia._nombre not in rendimiento:
                rendimiento[materia._nombre] = []
            rendimiento[materia._nombre].append(promedio)

    return jsonify({"calificaciones": calificacion.to_dict_list()})
    
    # Promedios por materia
   
