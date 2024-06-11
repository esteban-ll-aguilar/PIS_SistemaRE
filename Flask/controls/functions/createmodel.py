from controls.materiaDaoControl import MateriaDaoControl
from controls.docenteDaoControl import DocenteDaoControl
from controls.periodoAcademicoDaoControl import PeriodoAcademicoDaoControl
from controls.funcionDocenteDaoControl import FuncionDocente
from controls.estudianteDaoControl import EstudianteDaoControl

class CreateModel:
    
    def createMateria(data, idCiclo):
        materia = MateriaDaoControl()
        materia._materia._nombre = data['Materia']
        materia._materia._cicloId = idCiclo
        materia.save
        return materia._materia._id
    

        
    def createDocente(data, idCuenta, idRol):
        docente = DocenteDaoControl()
        docente._docente._rolId = idRol
        docente._docente._nombre = data['Nombre']
        docente._docente._apellido = data['Apellido']
        docente._docente._cedula = data['Cedula']
        docente._docente._cubiculo = data['Cubiculo']
        docente._docente._cuentaId = idCuenta
        docente.save
        return docente._docente._cedula
    

    
    def createPeriodoAcademico(data):
        periodoAc = PeriodoAcademicoDaoControl()
        periodoAc._periodoAcademico._nombre = data['PeriodoAcademico']
        periodoAc.save
        return periodoAc._periodoAcademico._id
    
    def createRol(rolname):
        rol = FuncionDocente()
        rol._rol._nombre = rolname
        rol.save
        return rol._rol._id
    
    
    def createEstudiante(data, idCuenta, idRol):
        estudiante = EstudianteDaoControl()
        estudiante._estudiante._rolId = idRol
        estudiante._estudiante._nombre = data['Nombre']
        estudiante._estudiante._apellido = data['Apellido']
        estudiante._estudiante._cedula = data['Cedula']
        estudiante._estudiante._cuentaId = idCuenta
        estudiante._estudiante._matricula = data['Matricula']
        estudiante.save
        return estudiante._estudiante._id