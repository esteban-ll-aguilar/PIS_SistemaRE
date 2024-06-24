from controls.materiaDaoControl import MateriaDaoControl
from controls.docenteDaoControl import DocenteDaoControl
from controls.periodoAcademicoDaoControl import PeriodoAcademicoDaoControl
from controls.funcionDocenteDaoControl import FuncionDocenteDaoControl
from controls.estudianteDaoControl import EstudianteDaoControl
from controls.usuarioDaoControl import UsuarioDaoControl
from controls.unidadDaoControl import UnidadDaoControl
from controls.rubricaCalificacionDaoControl import RubricaCalificacionDaoControl
import datetime
import pandas as pd
from controls.calificacionDaoControl import CalificacionDaoControl
class CreateModel:
    
    def createMateria(self,data):
        materia = MateriaDaoControl()
        materia._materia._nombre = data['Materia']
        materia._materia._ciclo = data['Ciclo']
        materia._materia._cedulaDocente = data['Cedula']
        materia.save
        return materia._materia._id
    

        
    def createDocente(self,data):
        usuario = UsuarioDaoControl()
        docente = DocenteDaoControl()
        
        existeUsuario, _, cedulaUsuario = usuario._lista.__exist__(data['Cedula'])
        if not existeUsuario: _, cedulaUsuario = self.createUsuario(data)
        
        docente._docente._cedula = cedulaUsuario
        docente._docente._experiencia = data['Experiencia']
        docente._docente._cubiculo = data['Cubiculo']
        docente.save
        return docente._docente._id, docente._docente._cedula
    
    def createEstudiante(self,data):
        
        usuario = UsuarioDaoControl()
        estudiante = EstudianteDaoControl()
        print(data['Fnacimiento'])#1124755200000
        #convertir fecha con pandas
        #print(pd.to_datetime(data['Fnacimiento'], unit='ms').strftime('%d-%m-%Y'))
        fecha = pd.to_datetime(data['Fnacimiento'], unit='ms').strftime('%d-%m-%Y')
        existeUsuario, _, cedulaUsuario = usuario._lista.__exist__(data['Cedula'])
        if not existeUsuario: _, cedulaUsuario = self.createUsuario(data)

        estudiante._estudiante._cedula = cedulaUsuario
        estudiante._estudiante._fechaNacimiento = fecha
        estudiante._estudiante._becaEconomica = "NULL" if data['BecaEc'] == None else data['BecaEc']
        estudiante.save
        return estudiante._estudiante._id, estudiante._estudiante._cedula
    
    
    
    def createUsuario(self,data, estado=0):
        usuario = UsuarioDaoControl()
        usuario._usuario._cedula = data['Cedula']
        usuario._usuario._nombres = data['Nombre']
        usuario._usuario._apellidos = data['Apellido']
        usuario._usuario._correo = data['Correo']
        usuario._usuario._contrasena = data['Cedula']
        usuario._usuario._estado = estado
        usuario.save
        return usuario._usuario._id, usuario._usuario._cedula

    
    
    
    def createFuncionDocente(self,funcion,userCedula):
        funcionD = FuncionDocenteDaoControl()
        funcionD._funcionDocente._descripcion = funcion
        funcionD._funcionDocente._docenteUserCedula = userCedula
        funcionD.save
        return funcionD._funcionDocente._id
    
    
    def createCalificacion(self, idCursa, idRubrica, idUnidad, valor):
        calificacion = CalificacionDaoControl()
        calificacion._calificacion._cursaId = idCursa
        calificacion._calificacion._valor = valor
        calificacion._calificacion._rubricaCalificacionId = idRubrica
        calificacion._calificacion._unidadId = idUnidad
        calificacion.save
        
    
    def createUnidad(self,data, materiaId):
        unidad = UnidadDaoControl()
        unidad._unidad._nombre = data['Unidad']
        unidad._unidad._nUnidad = data['nUnidad']
        unidad._unidad._materiaId = materiaId
        unidad.save
        
    def createRubricaCalificacion(self,descripcion):
        rubrica = RubricaCalificacionDaoControl()
        rubrica._rubricaCalificacion._descripcion = descripcion
        rubrica.save
        