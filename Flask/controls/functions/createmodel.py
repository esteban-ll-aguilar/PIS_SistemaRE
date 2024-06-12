from controls.materiaDaoControl import MateriaDaoControl
from controls.docenteDaoControl import DocenteDaoControl
from controls.periodoAcademicoDaoControl import PeriodoAcademicoDaoControl
from controls.funcionDocenteDaoControl import FuncionDocenteDaoControl
from controls.estudianteDaoControl import EstudianteDaoControl
from controls.calificacionDaoControl import CalificacionDaoControl
class CreateModel:
    
    def createMateria(data, docenteId):
        materia = MateriaDaoControl()
        materia._materia._nombre = data['Materia']
        materia._materia._ciclo = data['Ciclo']
        materia._materia._cedulaDocente = data['Cedula']
        materia._materia._docenteId = docenteId
        materia.save
        return materia._materia._id
    

        
    def createDocente(data):
        docente = DocenteDaoControl()
        docente._docente._cedula = data['Cedula']
        docente._docente._nombres = data['Nombre']
        docente._docente._apellidos = data['Apellido']
        docente._docente._correo = data['Correo']
        docente._docente._contrasena = data['Cedula']
        docente._docente._estado = 0
        docente._docente._cubiculo = data['Cubiculo']
        docente.save
        return docente._docente._id, docente._docente._cedula
    

    
    
    
    def createFuncionDocente(funcionD,userCedula, userId):
        funcionD = FuncionDocenteDaoControl()
        funcionD._funcionDocente._descripcion = funcionD
        funcionD._funcionDocente._docenteUserCedula = userCedula
        funcionD._funcionDocente._docenteUserId = userId
        funcionD.save
    
    
    def createEstudiante(data):
        estudiante = EstudianteDaoControl()
        estudiante._estudiante._cedula = data['Cedula']
        estudiante._estudiante._nombres = data['Nombre']
        estudiante._estudiante._apellidos = data['Apellido']
        estudiante._estudiante._correo = data['Correo']
        estudiante._estudiante._estado = 1
        estudiante.save
        return estudiante._estudiante._id, estudiante._estudiante._cedula
    
    def createCalificacion(idCursa):
        calificacion = CalificacionDaoControl()
        calificacion._calificacion._cursaId = idCursa
        calificacion._calificacion._valor = 0
        calificacion._calificacion._rubricaCalificacionId = 0
        calificacion._calificacion._unidadId = 0
        calificacion.save
        return calificacion._calificacion._id