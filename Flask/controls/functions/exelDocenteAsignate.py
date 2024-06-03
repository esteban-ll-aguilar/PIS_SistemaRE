from controls.asignacionDocenteDaoControl import AsignacionDocenteDaoControl
from controls.functions.exelDaoAdapter import ExelDaoAdapter
from controls.materiaDaoControl import MateriaDaoControl
from controls.docenteDaoControl import DocenteDaoControl
from Flask.controls.cuentaDaoControl import CuentaDaoControl
from controls.cicloDaoContol import CicloDaoControl
from controls.periodoAcademicoDaoControl import PeriodoAcademicoDaoControl
from controls.rolDaoControl import RolDaoControl
from controls.functions.createmodel import CreateModel

class ExelDocentesAsignate(ExelDaoAdapter):
    def __init__(self, file_path: str):
        super().__init__(AsignacionDocenteDaoControl, file_path)
        self.__asignacionDocente = None
        self.__materiaDaoControl = None
        self.__docenteDaoControl = None
        self.__cuentaDaoControl = None
        self.__cicloDaoControl = None
        self.__periodoAc = None    
        self.__rolDaoControl = None

    @property
    def _rolDaoControl(self):
        if self.__rolDaoControl is None:
            self.__rolDaoControl = RolDaoControl()
        return self.__rolDaoControl

    @_rolDaoControl.setter
    def _rolDaoControl(self, value):
        self.__rolDaoControl = value


    @property
    def _periodoAc(self):
        if self.__periodoAc is None:
            self.__periodoAc = PeriodoAcademicoDaoControl()
        return self.__periodoAc

    @_periodoAc.setter
    def _periodoAc(self, value):
        self.__periodoAc = value

    @property
    def _cicloDaoControl(self):
        if self.__cicloDaoControl is None:
            self.__cicloDaoControl = CicloDaoControl()
        return self.__cicloDaoControl

    @_cicloDaoControl.setter
    def _cicloDaoControl(self, value):
        self.__cicloDaoControl = value
        
    

    @property
    def _asignacionDocente(self):
        if self.__asignacionDocente is None:
            self.__asignacionDocente = AsignacionDocenteDaoControl()
        return self.__asignacionDocente

    @_asignacionDocente.setter
    def _asignacionDocente(self, value):
        self.__asignacionDocente = value

    @property
    def _materiaDaoControl(self):
        if self.__materiaDaoControl is None:
            self.__materiaDaoControl = MateriaDaoControl()
        return self.__materiaDaoControl

    @_materiaDaoControl.setter
    def _materiaDaoControl(self, value):
        self.__materiaDaoControl = value

    @property
    def _docenteDaoControl(self):
        if self.__docenteDaoControl is None:
            self.__docenteDaoControl = DocenteDaoControl()
        return self.__docenteDaoControl

    @_docenteDaoControl.setter
    def _docenteDaoControl(self, value):
        self.__docenteDaoControl = value

    @property
    def _cuentaDaoControl(self):
        if self.__cuentaDaoControl is None:
            self.__cuentaDaoControl = CuentaDaoControl()
        return self.__cuentaDaoControl

    @_cuentaDaoControl.setter
    def _cuentaDaoControl(self, value):
        self.__cuentaDaoControl = value

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
            existRol, idRol = self._rolDaoControl._lista.__exist__('DOCENTE')
            existCiclo, idCiclo = self._cicloDaoControl._lista.__exist__(data['Ciclo'], data['Paralelo'])
            existMateria, idMateria = self._materiaDaoControl._lista.__exist__(data['Materia'])
            existCuenta, idCuenta = self._cuentaDaoControl._lista.__exist__(data['Correo'])
            existDocente, idDocente = self._docenteDaoControl._lista.__exist__(data['Cedula'])
            existPeriodoAc, idPeriodoAc = self._periodoAc._lista.__exist__(data['PeriodoAcademico'])
            
            if not existRol: idRol = CreateModel.createRol('DOCENTE')
            if not existCiclo: idCiclo = CreateModel.createCiclo(data)
            if not existPeriodoAc: idPeriodoAc = CreateModel.createPeriodoAcademico(data)
            if not existMateria: idMateria = CreateModel.createMateria(data, idCiclo)
            if not existCuenta: idCuenta = CreateModel.createCuenta(data)
            if not existDocente: idDocente = CreateModel.createDocente(data, idCuenta, idRol)
            
            self._asignacionDocente._asignacionDocente._cedulaId = idDocente
            self._asignacionDocente._asignacionDocente._materiaId = idMateria
            
            self._asignacionDocente._asignacionDocente._periodoAcademicoId = idPeriodoAc
            self._asignacionDocente.save
            
            
            
            
        return 'Docentes asignados'
    
    
    
    
    
    
    
    

    
        
        
    
    
        
    