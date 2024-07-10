from models.calificacion import Calificacion
from controls.dao.daoAdapter import DaoAdapter
class CalificacionDaoControl(DaoAdapter):
    def __init__(self):
        super().__init__(Calificacion)
        self.__calificacion = None
        
    @property
    def _calificacion(self):
        if self.__calificacion is None:
            self.__calificacion = Calificacion()
        return self.__calificacion
    
    @_calificacion.setter
    def _calificacion(self, value):
        self.__calificacion = value
        
    
    @property
    def _lista(self):
        return self._list()
    
    @property
    def save(self):
        self.__calificacion._id = self._lista._length + 1
        print("Guardando Calificacion")
        self._save(self.__calificacion)
        
    def merge(self):
        self._merge(self.__calificacion)
    