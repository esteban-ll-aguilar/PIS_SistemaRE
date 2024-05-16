from controls.asignacionDocenteDaoControl import AsignacionDocenteDao
from funtions.readDocentesExel import ReadDocentesExel
class ExelDao:
    def __init__(self):
        self.__readExel = None
        self.__asignacionDocente = None

    @property
    def _readExel(self):
        if self.__readExel is None:
            self.__readExel = ReadDocentesExel()
        return self.__readExel

    @_readExel.setter
    def _readExelD(self, value):
        self.__readExel = value

    @property
    def _asignacionDocente(self):
        if self.__asignacionDocente is None:
            self.__asignacionDocente = AsignacionDocenteDao()
        return self.__asignacionDocente

    @_asignacionDocente.setter
    def _asignacionDocente(self, value):
        self.__asignacionDocente = value
        
        
    @property
    def asignarDocentes(self):
        from controls.cicloDaoContol import CicloDaoControl
        from controls.rolDaoControl import RolDaoControl
        from controls.docenteDaoControl import DocenteDaoControl
        from controls.materiaDaoControl import MateriaDaoControl
        from controls.cuentaControlDao import CuentaDaoControl
        
        docentesexel = self._readExel.toArray(12)
        ciclo = CicloDaoControl()
        rol = RolDaoControl()
        docente = DocenteDaoControl()
        materia = MateriaDaoControl()
        cuenta = CuentaDaoControl()
        print(docentesexel)
        for docentes in docentesexel:
            docente._docente._nombre = docentes[0]
            docente._docente._apellido = docentes[1]
            docente._docente._cedula = docentes[6]
            rol._rol._nombre = "Docente"
            #guardar rol
            rol.save
            docente._docente._rol = rol._rol
            cuenta._cuenta._correo = docentes[3]
            #guardar cuenta
            cuenta.save
            docente._docente._cuenta = cuenta._cuenta
            #guardar docente
            docente.save
            materia._materia._nombre = docentes[4]
            ciclo._ciclo._ciclo = docentes[5]
            ciclo._ciclo._paralelo = docentes[6]
            ciclo.save
            materia._materia._ciclo = ciclo._ciclo
            materia.save
            self._asignacionDocente._asignacionDocente._docente = docente._docente
            self._asignacionDocente._asignacionDocente._materia = materia._materia
            self._asignacionDocente.save
            
            
            
            """ self._asignacionDocente._asignacionDocente._docente._rol._nombre = "Docente"
            self._asignacionDocente._asignacionDocente._docente._nombre = docente[0]
            self._asignacionDocente._asignacionDocente._docente._apellido = docente[1]
            self._asignacionDocente._asignacionDocente._docente._cuenta.correo = docente[2]
            self._asignacionDocente._asignacionDocente._materia._nombre = docente[3]
            self._asignacionDocente._asignacionDocente._materia._ciclo._nombre = docente[4]
            self._asignacionDocente._asignacionDocente._materia._ciclo._paralelo = docente[5]
            self._asignacionDocente._asignacionDocente._docente._cedula = docente[6]
            self._asignacionDocente.save
             """
            """ self._asignacionDocente._asignacionDocente = docente
            print(self._asignacionDocente._asignacionDocente.serialize)
            self._asignacionDocente.save """
        return "Docentes asignados"
    
        
    