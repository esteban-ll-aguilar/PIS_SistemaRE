from controls.asignacionDocenteDaoControl import AsignacionDocenteDaoControl
from controls.funtions.exelDaoAdapter import ExelDaoAdapter
from controls.materiaDaoControl import MateriaDaoControl
from controls.docenteDaoControl import DocenteDaoControl
from controls.cuentaControlDao import CuentaDaoControl
from controls.cicloDaoContol import CicloDaoControl
from controls.periodoAcademicoDaoControl import PeriodoAcademicoDaoControl

class ExelDocentes(ExelDaoAdapter):
    def __init__(self, file_path: str):
        super().__init__(AsignacionDocenteDaoControl, file_path)
        self.__asignacionDocente = None
        self.__materiaDaoControl = None
        self.__docenteDaoControl = None
        self.__cuentaDaoControl = None
        self.__cicloDaoControl = None
        self.__periodoAc = None    


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
    
    
    
    def createMateria(self, data, idCiclo):
        self._materiaDaoControl._materia._nombreMateria = data['Materia']
        self._materiaDaoControl._materia._cicloId = idCiclo
        self._materiaDaoControl.save
        return self._materiaDaoControl._materia._id
    
    def createCiclo(self, data):
        self._cicloDaoControl._ciclo._ciclo = data['Ciclo']
        self._cicloDaoControl._ciclo._paralelo = data['Paralelo']
        self._cicloDaoControl.save
        return self._cicloDaoControl._ciclo._id
    
    def createDocente(self, data, idCuenta):
        self._docenteDaoControl._docente._nombre = data['Nombre']
        self._docenteDaoControl._docente._apellido = data['Apellido']
        self._docenteDaoControl._docente._cedula = data['Cedula']
        self._docenteDaoControl._docente._cuentaId = idCuenta
        self._docenteDaoControl.save
        return self._docenteDaoControl._docente._cedula
    
    def createCuenta(self, data):
        self._cuentaDaoControl._cuenta._correo = data['Correo']
        self._cuentaDaoControl._cuenta._clave = data['Clave']
        self._cuentaDaoControl.save
        return self._cuentaDaoControl._cuenta._id
    
    
    def createPeriodoAcademico(self, data):
        print(data['PeriodoAcademico'])
        self._periodoAc._periodoAcademico._nombrePeriodoAcademico = data['PeriodoAcademico']
        self._periodoAc.save
        return self._periodoAc._periodoAcademico._id
    
    @property
    def asignarDocente(self):
        datos = self._readExel
        for data in datos:
            print(data['PeriodoAcademico'])
            existCiclo, idCiclo = self._cicloDaoControl._lista.__exist__(data['Ciclo'], data['Paralelo'])
            existMateria, idMateria = self._materiaDaoControl._lista.__exist__(data['Materia'])
            existCuenta, idCuenta = self._cuentaDaoControl._lista.__exist__(data['Correo'])
            existDocente, idDocente = self._docenteDaoControl._lista.__exist__(data['Cedula'])
            existPeriodoAc, idPeriodoAc = self._periodoAc._lista.__exist__(data['PeriodoAcademico'])
            print(existPeriodoAc, idPeriodoAc)
            
            
            if not existCiclo: idCiclo = self.createCiclo(data)
            if not existPeriodoAc: idPeriodoAc = self.createPeriodoAcademico(data)
            if not existMateria: idMateria = self.createMateria(data, idCiclo)
            if not existCuenta: idCuenta = self.createCuenta(data)
            if not existDocente: idDocente = self.createDocente(data, idCuenta)
            
            self._asignacionDocente._asignacionDocente._cedulaId = idDocente
            self._asignacionDocente._asignacionDocente._materiaId = idMateria
            
            self._asignacionDocente._asignacionDocente._periodoAcademicoId = idPeriodoAc
            self._asignacionDocente.save
            
            
            
            
        return 'Docentes asignados'
    
    
    
    
    
    
    
    

    
        
        
    
    
        
    