from flask import Blueprint, jsonify, make_response, request, render_template, redirect, url_for, abort, send_from_directory
from app import MAIL
import requests, subprocess

from controls.functions.exelDocenteAsignate import ExelDocentesAsignate
from flask_cors import CORS
import os, sys
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
from controls.functions.exelFormat import ExelFormat
from config.DBConfig import DBConnection
import io # gráfica
import base64 # gráfica 
api = Blueprint('api', __name__)

#get para presentar los datos
#post para enviar los datos, modificar y iniciar sesion



@api.route('/mail', methods=['POST'])    
def mail(): 
    data = request.json
    #sujeto, destinatario, cuerpo
    #print(data)
    if isinstance(data['recipient'], list):
        enviado = MAIL().send_email(subject=data['subject'], recipient=data['recipient'], body=data['body'])
    else:
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
    if data['email'] == 'admin@unl.edu.ec' and data['password'] == 'admin':
        user._lista.search_model(data['email'], '_correo')
        print(user.to_dict_list())
        return jsonify({"message": "Usuario encontrado", "docente": user.to_dict_list(), "funcion": [{"docente_user_cedula": "9999999999","descripcion":"ADMIN"}]})
    docente = user._lista.search_model(data['email'], '_correo')  
    if docente is None:
        return make_response(jsonify({"message": "Usuario no encontrado, usted no esta registrado en la platafoma"}), 400)
    if FuncionDocenteDaoControl()._lista.search_model(docente[0]._cedula, '_docenteUserCedula') is None:
        return make_response(jsonify({"message": "Usuario no encontrado, usted no esta registrado en la platafoma"}), 400)
    
    if docente[0]._estado == '0':
        return abort(400)
    
    if docente[0]._correo == data['email'] and docente[0]._contrasena == data['password']:
        funcion._lista.search_model(docente[0]._cedula, '_docenteUserCedula', type=0)
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
        
@api.route('/actualizar/usuario', methods=['PUT'])
def actualizar_usuario():
        user = UsuarioDaoControl()
        data = request.json
        user._usuario = user._usuario.deserialize(data=data)
        print(user._usuario.serializable)
        user.merge()
        return make_response(jsonify({"usuario": user.to_dict_list()}))
        
@api.route('/ver/materias', methods=['GET'])
def ver_materias():
    materias = MateriaDaoControl()
    materias._lista.sort_models('_ciclo', 0)
    return make_response(jsonify({"materias": materias.to_dict_list()}))


@api.route('/actualizar/materia', methods=['PUT'])
def materia():
    materia = MateriaDaoControl()
    data = request.json
    materia._materia = materia._materia.deserialize(data=data)
    materia.merge()
    
    return make_response(jsonify({"materia": materia.to_dict_list()}))

@api.route('/guardar/foto/perfil/<string:cedula>', methods=['POST'])
def actualizar_foto_perfil(cedula):
    user = UsuarioDaoControl()
    usuario = user._lista.search_model(cedula, '_cedula')
    data = request.files
    
    #cambiar el nombre de la imagen por la cedula sin danar la extension
    data['file'].filename = cedula + os.path.splitext(data['file'].filename)[1]
    URL = os.path.join(os.getcwd(), 'data', 'images', data['file'].filename)
    data['file'].save(URL)
    
    usuario[0]._urlImagen = URL
    user._usuario = usuario[0]
    user.merge()
    return make_response(jsonify({"usuario": user.to_dict_list()}))

@api.route('/verificar/documento', methods=['GET'])
def verificar_documento():
    filename = request.args.get('filename')
    if not filename:
        return make_response(jsonify({"message": "Filename parameter is required"}), 400)
    
    upload_folder = os.path.join(os.getcwd(), 'data', 'documents')
    file_path = os.path.join(upload_folder, filename)

    if os.path.exists(file_path):
        return make_response(jsonify({"exists": True}), 200)
    else:
        return make_response(jsonify({"exists": False}), 200)

@api.route('/exportar/dataBase', methods=['GET'])
def exportar_dataBase():
    db = DBConnection()
    file_path = r"C:\app\esteb\product\21c\admin\xe\dpdump\BACKUP.DMP"
    #eliminar el archivo si existe
    if os.path.exists(file_path):
       os.remove(file_path)
    
    db.exportDataBase
    print(os.path.dirname(file_path))
    print(os.path.basename(file_path))
    
    return send_from_directory(
        directory=os.path.dirname(file_path),
        path=os.path.basename(file_path),
        as_attachment=True
    )   
    
@api.route('/guardar/documento', methods=['POST'])
def guardar_documento():
    if 'file' not in request.files:
        return make_response(jsonify({"message": "No file part in the request"}), 400)

    file = request.files['file']
    if file.filename == '':
        return make_response(jsonify({"message": "No selected file"}), 400)

    upload_folder = os.path.join(os.getcwd(), 'data', 'documents')
    os.makedirs(upload_folder, exist_ok=True)
    file_path = os.path.join(upload_folder, file.filename)

    if os.path.exists(file_path):
        return make_response(jsonify({"message": "El archivo ya existe"}), 400)
    
    file.save(file_path)
    return make_response(jsonify({"message": "Documento guardado correctamente"}), 200)

@api.route('/documento/exists', methods=['GET'])
def check_document_exists():
    filename = request.args.get('filename')
    if not filename:
        return make_response(jsonify({"exists": False}), 400)

    file_path = os.path.join(os.getcwd(), 'data', 'documents', filename)
    exists = os.path.exists(file_path)
    return jsonify({"exists": exists})

def check_document_exists():
    filename = request.args.get('filename')
    if not filename:
        return make_response(jsonify({"exists": False}), 400)

    file_path = os.path.join(os.getcwd(), 'data', 'documents', filename)
    exists = os.path.exists(file_path)
    return jsonify({"exists": exists})

@api.route('/documento/delete', methods=['DELETE'])
def delete_document():
    filename = request.args.get('filename')  # Corregido de .delete a .get
    if not filename:
        return make_response(jsonify({"delete": False}), 400)

    file_path = os.path.join(os.getcwd(), 'data', 'documents', filename)
    if os.path.exists(file_path):
        os.remove(file_path)  # Elimina el archivo si existe
        return jsonify({"delete": True})
    else:
        return make_response(jsonify({"message": "File not found"}), 404)

@api.route('/documento/<filename>', methods=['GET'])
def get_document(filename):
    file_path = os.path.join(os.getcwd(), 'data', 'documents', filename)
    if not os.path.exists(file_path):
        return make_response(jsonify({"message": "File not found"}), 404)

    return send_from_directory(os.path.dirname(file_path), filename)

    

@api.route('/obtener/documento/<string:documento>', methods=['GET'])
def obtener_documento(documento):
    documento = "FormatoDocentes.xlsx"
    URL = os.path.join(os.getcwd(), 'data', 'documents', documento)
    if not os.path.exists(URL):
        return make_response(jsonify({"message": "El archivo no existe"}), 404)
    return send_from_directory(os.path.dirname(URL), os.path.basename(URL))

@api.route('/obtener/periodo_academico', methods=['GET'])
def obtener_periodo_academico():
    periodo = PeriodoAcademicoDaoControl()
    periodo._lista.search_model(ultimo_periodoId(), '_id')
    return make_response(jsonify({"periodo_academico": periodo.to_dict_list()}))

@api.route('/ver/foto/perfil/<string:cedula>', methods=['GET'])
def ver_foto_perfil(cedula):
    user = UsuarioDaoControl()
    user._lista.search_model(cedula, '_cedula')
    URL = user.lista.toArray[0]._urlImagen
    print(URL)
    if URL == "NULL":
        return make_response(jsonify({"message": "No se encontro la imagen"}), 404)
    
    return send_from_directory(os.path.dirname(URL), os.path.basename(URL))

pdf_folder = os.path.join(os.getcwd(), 'data', 'documents')
pdf_filename = 'informedeseguimientoestudiantil.pdf'
pdf_path = os.path.join(pdf_folder, pdf_filename)





@api.route('/ver/docentes', methods=['GET'])
def ver_docentes():
    docentes = DocenteDaoControl()
    usuarios = UsuarioDaoControl()
    docentes._lista.toArray
    listaUser = usuarios._lista.toArray
    aux = []
    for i in range(0, len(docentes.lista.toArray)):
        usuarios.lista.toList(listaUser)
        user = usuarios.lista.search_model(docentes.lista.toArray[i]._cedula, '_cedula', type=0)
        aux.append(user[0].serializable)
    return make_response(jsonify({"docentes": aux}))

@api.route('/ver/estudiantes', methods=['GET'])
def ver_estudiantes():
    estudiantes = EstudianteDaoControl()
    usuarios = UsuarioDaoControl()
    estudiantes._lista.toArray
    listaUser = usuarios._lista.toArray 
    aux = []
    for i in range(0, len(estudiantes.lista.toArray)):
        usuarios.lista.toList(listaUser)
        user = usuarios.lista.search_model(estudiantes.lista.toArray[i]._cedula, '_cedula', type=0)
        aux.append(user[0].serializable)
    return make_response(jsonify({"estudiantes": aux}))

@api.route('/estudiantes/eliminar/cursa/estudiante/<string:estudiante>/materia/<int:materia>', methods=['DELETE'])
def eliminar_cursa(estudiante, materia):
    cursa = CursaDaoControl()
    cursa._lista.search_model(estudiante, '_estudianteCedula')
    cursa.lista.search_model(materia, '_materiaId', type=0)
    data = cursa.to_dict_list()
    aux = cursa._cursa.deserialize(data=data[0])
    cursa._cursa = aux
    cursa.delete()
    
    return jsonify({"message": "Eliminado correctamente"})



""" @api.route('/exel_docente', methods=['POST'])
def upload_file_docente():
    f = request.files['file'] 
    EDA = ExelDocentesAsignate(f)
    try:
        EDA.saveExel
        EDA.asignarDocente
    except Exception as e:
        print('Error: '+str(e))
        return jsonify({"message": "Error al subir el archivo"})
    return jsonify({"message": "Archivo subido correctamente"}) """



#[docente, administrador]
#para el array en donde contenga un dodente y administrador retorne a una pagina, 
@api.route('/estudiantes/calificaciones/materia/<int:materiaId>/unidad/<int:unidadId>', methods=['GET'])
def estudiantes_calificaciones_materias_unidad(materiaId,unidadId):
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
        estudiantesList = estudiantes._lista.toArray
        listEstudiante = []
        
        for i in range(0, len(listcursa)):
            estudiantes.lista.toList(estudiantesList)
            estudiante = estudiantes.lista.search_model(listcursa[i]._estudianteCedula, '_cedula')
            listEstudiante.append(estudiante[0])  
        estudiantes.lista.toList(listEstudiante)
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
            if calif is not None:
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


# filtrar materias de primer ciclo, despues con el id de las materias buscarB
#las materias en calificaciones, despues separar por unidad
# PARA EL CLUSTER -------------------------------------
# @api.route('/promedios/materia/<int:materiaId>/unidad/<int:unidadId>')
# def promedios(materiaId, unidadId):
#     URL = f'http://localhost:5000/estudiantes/calificaciones/materia/{materiaId}/unidad/{unidadId}'
    
#     try:
#         # Realiza la solicitud GET para obtener los datos
#         response = requests.get(URL)
#         response.raise_for_status()  # Verifica si la solicitud fue exitosa
#         data = response.json()
#     except requests.RequestException as e:
#         print(f"Error en la solicitud GET: {e}")
#         print("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
#         return None
#     except ValueError as e:
#         print(f"Error al decodificar JSON: {e}")
#         return None
    
#     # URL para la solicitud POST
#     URL1 = 'http://192.168.1.2:5500/notas'
    
#         # Envía los datos obtenidos a la ruta /notas usando POST
#     post_response = requests.post(URL1, json=data)
#     print(post_response.json())
#     return jsonify(post_response.json())

# # PARA EL SISTEMA -------------------------------------
@api.route('/promedios/materia/<int:materiaId>/unidad/<int:unidadId>')
def promedios(materiaId, unidadId):
    URL = 'http://localhost:5000/estudiantes/calificaciones/materia/'+str(materiaId)+'/unidad/'+str(unidadId)
    
    response = requests.get(URL)
    data = response.json()    
    listaCalificaciones = data['calificaciones']
    listaEstudiantes = data['estudiantes']
    promedios = []
    estudiantes = []
    j = 0
    for nota in listaCalificaciones:
        promedio = 0
        for i in range(0, len(nota)):
            promedio += float(nota[i]['valor'])
        promedios.append(promedio)
        listaEstudiantes[j]["promedio"] = round(promedio,2)
        estudiantes.append(listaEstudiantes[j])
        j+=1
    promedios = np.array(promedios, dtype=float)
    if promedios.size == 0:
        return jsonify({"promedio_Materia": 0, "estudiantes": []})
    promedio = round(np.mean(promedios), 2)
    #print(estudiantes)
    return jsonify({"promedio_Materia": promedio, "estudiantes": estudiantes})
    


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
    cursa._lista.search_model(ultimo_periodoId(), '_periodoAcademicoId')
    cursa.lista.search_model(materiaId, '_materiaId', type=0, method=1)
    cursa.lista.sort_models('_id', 0)
    cursa = cursa.lista.toArray
    if len(cursa) != len(notas):
        print(len(cursa))
        print(len(notas))
        abort(400)
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
def ciclos_existentes():
    materias = MateriaDaoControl()
    aux = materias._lista.sort_models('_ciclo', 0)
    ciclos = []
    for i in range(1, len(aux)):
        if aux[i-1]._ciclo != aux[i]._ciclo:
            ciclos.append(aux[i-1]._ciclo)
        if i == len(aux)-1:
            ciclos.append(aux[i]._ciclo)  
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
    nunidad = None
    if unidad._lista.isEmpty != True:
        nunidad = unidad._lista.search_model(materiaId, '_materiaId')
    
    if unidad._lista.isEmpty or nunidad is None:
        CreateModel().createUnidad(nombre=data['nombre'], materiaId=materiaId, nunidad=1)
        return make_response(jsonify({"message": "Unidad creada correctamente"}))
    
    existeUnidad, _,_ =unidad.lista.__exist__(data['nombre'], id=materiaId, nunidad=len(nunidad)+1)
    if not existeUnidad:
        CreateModel().createUnidad(nombre=data['nombre'], materiaId=materiaId, nunidad=len(nunidad)+1)
        return make_response(jsonify({"message": "Unidad creada correctamente"}))
    return make_response(jsonify({"message": "Unidad ya existe"}), 400)
    



@api.route('/materia/unidad/<int:materiaId>', methods=['GET'])
def ver_unidades(materiaId):
    unidad = UnidadDaoControl()
    unidad._lista.search_model(materiaId, '_materiaId')
    unidad.lista.sort_models('_nUnidad',type=0)
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

@api.route('/promedios/materias/docente/<string:docente>', methods=['GET'])
def bajas_calificaciones_materias_docente(docente):
    URL = 'http://localhost:5000/docente/materias/'+docente
    response = requests.get(URL)
    data = response.json()
    print(data)
    materias = data['materias']
    unidades = UnidadDaoControl()
    unidad = unidades._lista.toArray
    promedios = {}
    for i in range(0, len(materias)):
        unidades.lista.toList(unidad)
        aux = unidades.lista.search_model(materias[i]['idmateria'], '_materiaId')
        if aux != None:
            URL = 'http://localhost:5000/promedios/materia/'+str(materias[i]['idmateria'])+'/unidad/'+str(len(aux))
            response = requests.get(URL)
            data = response.json()
            promedioEstudiante = []
            
            for estudiante in data['estudiantes']:
                if estudiante['promedio'] < 7:
                    promedioEstudiante.append(estudiante)
            promedios[materias[i]['nombre']] = promedioEstudiante
    
    return jsonify({"notasBajasMaterias": promedios})

@api.route('/notas/materias/docente/<string:docente>', methods=['GET'])
def notas_materiasUnidad_docente(docente):
    URL = 'http://localhost:5000/docente/materias/'+docente
    response = requests.get(URL)
    data = response.json()
    materias = data['materias']
    unidades = UnidadDaoControl()
    unidad = unidades._lista.toArray
    promedios = {}
    #separamos las calificaciones de los estudiantes en 4 listas
    #de 0 a 5, de 5 a 7, de 7 a 8.5, de 8.5 a 10
    """
        cada punto en el array significa la unidad y el numeros de estudiantes con esa nota
        "notasBajasMaterias": {
        "Materia 1": [
            "0 a 5": [4,5,6]
            "5 a 7": [6,7,8]
            "7 a 8.5": [8,9,10]
            "8.5 a 10": [9,10]
        ],
        }
    """
    
    for i in range(0, len(materias)):
        unidades.lista.toList(unidad)
        unidadSearch = unidades.lista.search_model(materias[i]['idmateria'], '_materiaId')
        promedios[materias[i]['nombre']] = {"0 a 5": [], "5 a 7": [], "7 a 8.5": [], "8.5 a 10": []}
        print(unidadSearch)
        if unidadSearch != None:
            auxUnidad = UnidadDaoControl()
            auxUnidad.lista.toList(unidadSearch)
            auxUnidad.lista.sort_models('_nUnidad', 0)
            unidadSearch = auxUnidad.lista.toArray
            for j in range(0, len(unidadSearch)):
                notas_0_5 = []
                notas_5_7 = []
                notas_7_85 = []
                notas_85_10 = []
                idUnidad = unidadSearch[j]._id
                print(materias[i]['idmateria'], idUnidad)
                URL = 'http://localhost:5000/promedios/materia/'+str(materias[i]['idmateria'])+'/unidad/'+str(idUnidad)
                response = requests.get(URL)
                data = response.json()
                
                for estudiante in data['estudiantes']:
                    if estudiante['promedio'] < 5:
                        notas_0_5.append(estudiante['promedio'])
                    elif estudiante['promedio'] >= 5 and estudiante['promedio'] < 7:
                        notas_5_7.append(estudiante['promedio'])
                    elif estudiante['promedio'] >= 7 and estudiante['promedio'] < 8.5:
                        notas_7_85.append(estudiante['promedio'])
                    elif estudiante['promedio'] >= 8.5 and estudiante['promedio'] <= 10:
                        notas_85_10.append(estudiante['promedio'])
                    
                promedios[materias[i]['nombre']]["0 a 5"].append(len(notas_0_5))
                promedios[materias[i]['nombre']]["5 a 7"].append(len(notas_5_7))
                promedios[materias[i]['nombre']]["7 a 8.5"].append(len(notas_7_85))
                promedios[materias[i]['nombre']]["8.5 a 10"].append(len(notas_85_10))
    #llenar de 0 hasta tener 3 elementos
    for key in promedios:
        for k in promedios[key]:
            while len(promedios[key][k]) < 3:
                promedios[key][k].append(0)
                
    return jsonify({"promediosUnidad": promedios})

@api.route('/ciclo/rendimiento/materias/', methods=['GET'])
def ciclo_rendimiento_materias():
    materias = MateriaDaoControl()
    unidades = UnidadDaoControl()
    listaUnidades = unidades._lista.toArray
    listaMaterias = materias._lista.toArray
    URL = 'http://localhost:5000/ciclos'
    response = requests.get(URL)
    data = response.json()
    ciclos = data['ciclos']
    rendimientoCiclos = {} 
    aux= [] 
    rendimientoMaterias = {}
    for ciclo in ciclos:
        materiasCiclo = materias.lista.search_model(ciclo, '_ciclo')
        rendimientoCiclos[ciclo] = {"promedioCiclo": 0}
        rendimientoMaterias[ciclo] = {"materias": []}
        auxPromedios = []
        rangoMateria = {}
        for materia in materiasCiclo:
            unidadesMateria = unidades.lista.search_model(materia._id, '_materiaId')
            promedios = []
            
            if unidadesMateria is None or len(unidadesMateria) == 0:
                rendimientoMaterias[ciclo]["materias"].append({materia._nombre: {"0 a 5": [0,0,0], "5 a 7": [0,0,0], "7 a 8.5": [0,0,0], "8.5 a 10": [0,0,0]}})
            else:
                rangoMateria[materia._nombre] = {"0 a 5": [], "5 a 7": [], "7 a 8.5": [], "8.5 a 10": []}
            
            if unidadesMateria is not None:
                notas_0_5 = []
                notas_5_7 = []
                notas_7_85 = []
                notas_85_10 = []
                for i in range(0, len(unidadesMateria)):
                    URL = 'http://localhost:5000/promedios/materia/'+str(materia._id)+'/unidad/'+str(unidadesMateria[i]._id)
                    response = requests.get(URL)
                    data = response.json()
                    print(data['promedio_Materia'])
                    promedios.append(data['promedio_Materia'])
                    for estudiante in data['estudiantes']:
                        if estudiante['promedio'] < 5:
                            notas_0_5.append(estudiante)
                        elif estudiante['promedio'] >= 5 and estudiante['promedio'] < 7:
                            notas_5_7.append(estudiante)
                        elif estudiante['promedio'] >= 7 and estudiante['promedio'] < 8.5:
                            notas_7_85.append(estudiante)
                        elif estudiante['promedio'] >= 8.5 and estudiante['promedio'] <= 10:
                            notas_85_10.append(estudiante)
                    
                    rangoMateria[materia._nombre]["0 a 5"].append(len(notas_0_5))
                    rangoMateria[materia._nombre]["5 a 7"].append(len(notas_5_7))
                    rangoMateria[materia._nombre]["7 a 8.5"].append(len(notas_7_85))
                    rangoMateria[materia._nombre]["8.5 a 10"].append(len(notas_85_10))
                    
                for key in rangoMateria:
                    for k in rangoMateria[key]:
                        while len(rangoMateria[key][k]) < 3:
                            rangoMateria[key][k].append(0)
                            
                auxPromedios.append(round(sum(promedios)/len(promedios),2))
            unidades.lista.toList(listaUnidades)
        if len(rangoMateria) != 0:
            rendimientoMaterias[ciclo]["materias"].append(rangoMateria)
        if len(auxPromedios) != 0:
            rendimientoCiclos[ciclo]["promedioCiclo"] = sum(auxPromedios)/len(auxPromedios)
        materias.lista.toList(listaMaterias)
    
    return jsonify({"rendimientoCiclos": rendimientoCiclos, "rendimientoMaterias": rendimientoMaterias})





def ultimo_periodoId():
    periodo = PeriodoAcademicoDaoControl()._list().toArray
    idultimoperiodo = periodo[len(periodo)-1]._id
    return idultimoperiodo







@api.route('/crear_estudiantes_docentes', methods=['POST'])# <-- Se permite la carga tanto de docentes como estudiantes (solo se crean cuando no existen.)
def crear_estudiantes_docentes():
    files = request.files
    data = request.form 
    print(files['docenteFile'])
    
    formato = ExelFormat()
    cumpleFEstudian = formato.verify_exel_format(files['estudianteFile'])
    cumpleFDocente = formato.verify_exel_format(files['docenteFile'], isStudent=False)
    print(cumpleFEstudian)
    print(cumpleFDocente)
    if not cumpleFEstudian or not cumpleFDocente:
        return jsonify({"message": "Formato de exel incorrecto"}, 404)
    
    existPeriodo, periodoAcId, _ = PeriodoAcademicoDaoControl()._lista.__exist__(data['nombrePeriodo'])    
    if PeriodoAcademicoDaoControl()._lista.isEmpty or not existPeriodo:
        periodoAcId = CreateModel().createPeriodoAcademico(data)
    
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

@api.route('/ver/funciones_docente/<string:cedulaDocente>')
def ver_funciones_docente(cedulaDocente):
    funcion = FuncionDocenteDaoControl()
    funcion._lista.search_model(cedulaDocente, '_docenteUserCedula', type=0)
    funcionesDelDocente = funcion.lista.toArray
    aux = []
    for i in range(0, len(funcionesDelDocente)):
        aux.append(funcionesDelDocente[i].serializable)
    return make_response(jsonify({"funciones": aux}))



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
    if PeriodoAcademicoDaoControl()._lista.isEmpty:
        return None
    periodo = PeriodoAcademicoDaoControl()._list().toArray
    idultimoperiodo = periodo[len(periodo)-1]._id
    return idultimoperiodo



#////////////////////////////////////////////////////////////////////////////////////////
#filtrado por ciclos y las materias de cada uno 
@api.route('/rendimiento/ciclo/<int:cicloId>', methods=['GET'])
def rendimiento_ciclo(cicloId):
    # Obtener materias del ciclo
    materias = MateriaDaoControl()
    materias._lista.search_model(cicloId, '_ciclo')
    print(materias.to_dict_list())
    print("ciclos cargados...", "\n\n")
    #en el frontend manejo la lógica de las materias.
    return make_response(jsonify({"materias": materias.to_dict_list()}))
#////////////////////////////////////////////////////////////////////////////////////////////
    

    
    
    

