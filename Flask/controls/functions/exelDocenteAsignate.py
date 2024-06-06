from controls.asignacionDocenteDaoControl import AsignacionDocenteDaoControl
from controls.functions.exelDaoAdapter import ExelDaoAdapter
from controls.materiaDaoControl import MateriaDaoControl
from controls.docenteDaoControl import DocenteDaoControl
from controls.cuentaDaoControl import CuentaDaoControl
from controls.cicloDaoContol import CicloDaoControl
from controls.periodoAcademicoDaoControl import PeriodoAcademicoDaoControl
from controls.rolDaoControl import RolDaoControl
from controls.functions.createmodel import CreateModel

class ExelDocentesAsignate(ExelDaoAdapter):
    def __init__(self, file_path: str):
        super().__init__(AsignacionDocenteDaoControl, file_path)
        

    @property
    def saveExel(self):
        return self._saveExel
    
    @property
    def readExel(self):
        return self._readExel
    
    
    @property
    def asignarDocente(self):
        datos = self._readExel
        for data in datos:
            existRol, idRol, _ = RolDaoControl()._lista.__exist__('DOCENTE')
            existCiclo, idCiclo, _ = CicloDaoControl()._lista.__exist__(data['Ciclo'], data['Paralelo'])
            existMateria, idMateria, _ = MateriaDaoControl()._lista.__exist__(data['Materia'])
            existCuenta, idCuenta, _ = CuentaDaoControl()._lista.__exist__(data['Correo'])
            existDocente, idDocente, CedulaDocente = DocenteDaoControl()._lista.__exist__(data['Cedula'])
            existPeriodoAc, idPeriodoAc, _ = PeriodoAcademicoDaoControl()._lista.__exist__(data['PeriodoAcademico'])
            
            
            if not existRol: idRol = CreateModel.createRol('DOCENTE')
            if not existCiclo: idCiclo = CreateModel.createCiclo(data)
            if not existPeriodoAc: idPeriodoAc = CreateModel.createPeriodoAcademico(data)
            if not existMateria: idMateria = CreateModel.createMateria(data, idCiclo)
            if not existCuenta: idCuenta = CreateModel.createCuenta(data)
            if not existDocente: CedulaDocente = CreateModel.createDocente(data, idCuenta, idRol)
            
            
            asignateDocente = AsignacionDocenteDaoControl()
            asignateDocente._asignacionDocente._cedulaId = CedulaDocente
            asignateDocente._asignacionDocente._materiaId = idMateria
            asignateDocente._asignacionDocente._periodoAcademicoId = idPeriodoAc
            asignateDocente.save
            
        return 'Docentes asignados'
    