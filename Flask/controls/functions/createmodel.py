from controls.materiaDaoControl import MateriaDaoControl
from controls.cicloDaoContol import CicloDaoControl
from controls.docenteDaoControl import DocenteDaoControl
from controls.cuentaDaoControl import CuentaDaoControl
from controls.periodoAcademicoDaoControl import PeriodoAcademicoDaoControl
from controls.rolDaoControl import RolDaoControl

class CreateModel:
    
    def createMateria(data, idCiclo):
        materia = MateriaDaoControl()
        materia._materia._nombre = data['Materia']
        materia._materia._cicloId = idCiclo
        materia.save
        return materia._materia._id
    
    def createCiclo(data):
        ciclo = CicloDaoControl()
        ciclo._ciclo._ciclo = data['Ciclo']
        ciclo._ciclo._paralelo = data['Paralelo']
        ciclo.save
        return ciclo._ciclo._id
        
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
    
    def createCuenta(data):
        cuenta = CuentaDaoControl()
        cuenta._cuenta._correo = data['Correo']
        cuenta._cuenta._clave = data['Clave']
        cuenta.save
        return cuenta._cuenta._id
    
    def createPeriodoAcademico(data):
        periodoAc = PeriodoAcademicoDaoControl()
        periodoAc._periodoAcademico._nombre = data['PeriodoAcademico']
        periodoAc.save
        return periodoAc._periodoAcademico._id
    
    def createRol(self, rol):
        rol = RolDaoControl()
        rol._rol._nombre = rol
        rol.save
        return rol._rol._id
    