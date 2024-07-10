from flask import Blueprint, jsonify, make_response, request, render_template, redirect, url_for, abort
from app import MAIL

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
from controls.docenteDaoControl import DocenteDaoControl
from controls.calificacionDaoControl import CalificacionDaoControl
from controls.periodoAcademicoDaoControl import PeriodoAcademicoDaoControl
from controls.functions.exelDocenteAsignate import ExelDocentesAsignate
from controls.functions.exelCursaAsignate import ExelCursaAsignate
import io # gráfica
import base64 # gráfica 
api = Blueprint('api', __name__)

#get para presentar los datos
#post para enviar los datos, modificar y iniciar sesion

@api.route('/hola')    
def mail_send():
    send = MAIL().send_email(subject="Hola", recipient=["esteban.leon@unl.edu.ec", "esteban.aguilar2005@hotmail.com"], body="Hola mundo")
    return jsonify({"message": "Correo enviado correctamente"})

@api.route('/mail', methods=['POST'])    
def mail(): 
    data = request.json
    
    enviado = MAIL().send_email(subject=data['subject'], recipient=[data['recipient']], body=data['body'])
    if enviado:
        return jsonify({"message": "Correo enviado correctamente"})
    return jsonify({"message": "Error al enviar el correo"})
    

    
    
@api.route('/login', methods=['POST'])
def login():
    user = UsuarioDaoControl()
    funcion = FuncionDocenteDaoControl()
    data = request.json
    print(data) 
    docente = user._lista.search_model(data['email'], '_correo')  
    if docente is None:
        return make_response(jsonify({"message": "Usuario no encontrado, usted no esta registrado en la platafoma"}), 400)
    if FuncionDocenteDaoControl()._lista.search_model(docente[0]._cedula, '_docenteUserCedula') is None:
        return make_response(jsonify({"message": "Usuario no encontrado, usted no esta registrado en la platafoma"}), 400)
    
    if docente[0]._estado == '0':
        return abort(400)
    
    if docente[0]._correo == data['email'] and docente[0]._contrasena == data['password']:
        funcion._lista.search_model(docente[0]._cedula, '_docenteUserCedula', type=0)
        print(funcion.lista.toArray[0])
        
        print(funcion.to_dict_list())
        return jsonify({"message": "Usuario encontrado", "docente": user.to_dict_list(), "funcion": funcion.to_dict_list()})
    else:
        return abort(400)



@api.route('/send-email-activar-cuenta', methods=['POST'])
def send_emailactivar_cuenta():
    user = UsuarioDaoControl()
    funcion = FuncionDocenteDaoControl()
    data = request.json
    docente = user._lista.search_model(data['email'], '_correo')  
    if docente is None:
        return make_response(jsonify({"message": "Usuario no encontrado, usted no esta registrado en la platafoma"}), 400)
    if FuncionDocenteDaoControl()._lista.search_model(docente[0]._cedula, '_docenteUserCedula') is None:
        return make_response(jsonify({"message": "Usuario no encontrado, usted no esta registrado en la platafoma"}), 400)
    
    #enviar correo de activacion
    print(docente[0].serializable)
    if docente[0]._estado == '1':
        return abort(400)
    
    body = f"Para activar su cuenta haga click en el siguiente enlace: http://localhost:3000/activar-cuenta/{docente[0]._cedula}"
    send = MAIL().send_email(subject="Activacion de cuenta", recipient=[data['email']], body=body)
    if send:
        return jsonify({"message": "Usuario encontrado", "docente": user.to_dict_list(), "funcion": funcion.to_dict_list()})  
    else:
        return abort(400)


@api.route('/activar-cuenta', methods=['POST'])
def activar_cuenta():
    user = UsuarioDaoControl()
    data = request.json
    docente = user._lista.search_model(data['email'], '_correo')  
    if docente is None:
        return make_response(jsonify({"message": "Usuario no encontrado, usted no esta registrado en la platafoma"}), 400)
    if docente[0]._correo == data['email']:
        user._lista.search_model(data['email'], '_correo')
        user.lista.toArray[0]._estado = 1
        auxuser = user.lista.toArray[0]
        print(auxuser)
        user._usuario = docente[0]
        user.merge()
        return jsonify({"message": "Usuario encontrado", "docente": user.to_dict_list()})
    else:
        return abort(400)

@api.route('/olvido-contrasena', methods=['POST'])
def olvido_contrasena():
    user = UsuarioDaoControl()
    data = request.json
    docente = user._lista.search_model(data['email'], '_correo')  
    if docente is None:
        return make_response(jsonify({"message": "Usuario no encontrado, usted no esta registrado en la platafoma"}), 404)
    if docente[0]._estado == '0':
        return abort(400)
    send = MAIL().send_email(subject="Recuperacion de contraseña", recipient=[data['email']], body=f"Su contraseña es: {docente[0]._contrasena}")
    if send:
        return jsonify({"message": "Correo enviado correctamente"})
    return jsonify({"message": "Error al enviar el correo"})


    
    
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
    
    return jsonify({"message": "Eliminado correctamente"})



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
#para el array en donde contenga un dodente y administrador retorne a una pagina, 
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


# filtrar materias de primer ciclo, despues con el id de las materias buscar
#lass mateias en calificaciones, despues separar por unidad


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
    if array is None:
        return make_response(jsonify({"materias": []}))
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
    

@api.route('/funcion_de_docentes', methods=['GET'])
def funcion_de_docentes():
    funcion = FuncionDocenteDaoControl()
    funcion._lista
    funcion.lista.sort_models('_descripcionFuncionD', 0)
    listaFuncion = funcion.lista.toArray
    
    docentes = DocenteDaoControl()
    docentes = docentes._lista.toArray
    usuarios = UsuarioDaoControl()
    listaUser = usuarios._lista.toArray

    arruser = []
    #usuarios
    for i in range(0, len(docentes)):
        usuarios.lista.toList(listaUser)
        user = usuarios.lista.search_model(docentes[i].serializable['user_cedula'], '_cedula', type=0)
        arruser.append(user[0])
        
    usuarios.lista.toList(arruser)
    usuarios.lista.sort_models('_primerApellido', 0)
    arruser = usuarios.lista.toArray
    aux = []
    for i in range(0, len(arruser)):
        auxFuncion = []
        funcion.lista.toList(listaFuncion)
        funciondocente = funcion.lista.search_model(arruser[i]._cedula, '_docenteUserCedula', type=0)
        
        if funciondocente is None:
            docente = {'nombres': arruser[i]._primerNombre +" "+ arruser[i]._segundoNombre , 'apellidos': arruser[i]._primerApellido +" "+ arruser[i]._segundoApellido, 'cedula': arruser[i]._cedula}
            aux.append({'user': docente, 'funcion': []})
        else:
            for j in range(0, len(funciondocente)):#9955926918
                auxFuncion.append(funciondocente[j].serializable)
            docente = {'nombres': arruser[i]._primerNombre +" "+ arruser[i]._segundoNombre , 'apellidos': arruser[i]._primerApellido +" "+ arruser[i]._segundoApellido, 'cedula': arruser[i]._cedula}
            aux.append({'user': docente, 'funcion': auxFuncion})
    
    return make_response(jsonify({"docentes": aux}))


@api.route('/crear/funcion_docente/<string:idCedDocente>/<string:funcionDocente>', methods=['POST'])
def crear_funcion_docente(idCedDocente,funcionDocente):
    funcion = FuncionDocenteDaoControl()
    funcion._lista.search_model(idCedDocente, '_docenteUserCedula', type=0)
    funcionesDelDocente = funcion.lista.toArray
    
    if funcion.lista.isEmpty:
        CreateModel().createFuncionDocente(funcion=funcionDocente, userCedula=idCedDocente)
        return make_response(jsonify({"message": "Funcion creada correctamente"}))
    
    for i in range(0, len(funcionesDelDocente)):
        funct = funcionesDelDocente[i]._descripcionFuncionD
        cedula = funcionesDelDocente[i]._docenteUserCedula
        
        if funct == funcionDocente and cedula == idCedDocente:
            return make_response(jsonify({"message": "Funcion ya existe"}), 400)
        
    CreateModel().createFuncionDocente(funcion=funcionDocente, userCedula=idCedDocente)
    return make_response(jsonify({"message": "Funcion creada correctamente"}))

@api.route('/eliminar/funcion_docente/<string:idCedDocente>/<string:funcionDocente>', methods=['POST'])
def eliminar_funcion_docente(idCedDocente,funcionDocente):
    funcion = FuncionDocenteDaoControl()
    funcion._lista.search_model(idCedDocente, '_docenteUserCedula', type=0)
    funcionesDelDocente = funcion.lista.toArray
    
    for i in range(0, len(funcionesDelDocente)):
        funct = funcionesDelDocente[i]._descripcionFuncionD
        cedula = funcionesDelDocente[i]._docenteUserCedula
        if funct == funcionDocente and cedula == idCedDocente:
            funcion._funcionDocente = funcionesDelDocente[i]
            funcion.delete()
            return make_response(jsonify({"message": "Funcion eliminada correctamente"}))
    return make_response(jsonify({"message": "Funcion no existe"}), 400)
    
    
    

@api.route('/calificaciones-por-materia/<int:cicloId>', methods=['GET'])
def calificaciones_por_materia(cicloId):
    periodoID = ultimo_periodoId()
    cursa = CursaDaoControl()
    cursa._lista.search_model(periodoID, '_periodoAcademicoId')
    
    materias = MateriaDaoControl()
    materias._lista.search_model(cicloId, '_ciclo')
    listaMaterias = materias.lista.toArray
    listaCursa = cursa.lista.toArray
    cusaMaterias = []
    for i in range(0, len(listaMaterias)):
        for j in range(0, len(listaCursa)):
            if listaMaterias[i]._id == listaCursa[j]._materiaId:
                cusaMaterias.append(listaCursa[j])
    cursa.lista.toList(cusaMaterias)
    unidades = UnidadDaoControl()
    listaUnidades = unidades._lista.toArray
    auxListUnidades = []
    for i in range(0, len(listaMaterias)):
        unidades.lista.toList(listaUnidades)
        aux = unidades.lista.search_model(listaMaterias[i]._id, '_materiaId')
        print(listaMaterias[i]._id)
        auxListUnidades.append(aux)
    print(auxListUnidades)
        
    return make_response(jsonify({"cursa": cursa.to_dict_list()}))





def ultimo_periodoId():
    periodo = PeriodoAcademicoDaoControl()._list().toArray
    idultimoperiodo = periodo[len(periodo)-1]._id
    return idultimoperiodo




@api.route('/rendimiento/ciclo/<int:cicloId>', methods=['GET'])
def rendimiento_ciclo(cicloId):
    # Obtener materias del ciclo
    materias = MateriaDaoControl()
    materias._lista.search_model(cicloId, '_ciclo')
    print(materias.to_dict_list())
    print("ciclos cargados...", "\n\n")  # hasta aquí esta bien.
    
    return make_response(jsonify({"materias": materias.to_dict_list()}))
    
    # Promedios por materia
   
