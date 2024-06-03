from controls.dao.daoAdapter import DaoAdapter
from models.asignacionDocente import AsignacionDocente
class AsignacionDocenteDaoControl(DaoAdapter):
    def __init__(self):
        super().__init__(AsignacionDocente)
        self.__asignacionDocente = None

    @property
    def _asignacionDocente(self):
        if self.__asignacionDocente is None:
            self.__asignacionDocente = AsignacionDocente()
        return self.__asignacionDocente

    @_asignacionDocente.setter
    def _asignacionDocente(self, value):
        self.__asignacionDocente = value

    @property
    def _lista(self):
        return self._list()
    
    def obtenerAsignacionDeMateria(self, asignacionDocenteId):
        return self._lista.__obtenerAsignacionDeMateria__(asignacionDocenteId)
        
    
    
    @property
    def save(self):
        self.__asignacionDocente._id = self._lista._length + 1
        print("Guardando Asignacion Docente")
        self._save(self.__asignacionDocente)
