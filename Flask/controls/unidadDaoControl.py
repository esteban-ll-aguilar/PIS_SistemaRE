from models.unidad import Unidad
from controls.dao.daoAdapter import DaoAdapter

class UnidadDaoControl(DaoAdapter):
    def __init__(self):
        super().__init__(Unidad)
        self.__unidad = None
        
    @property
    def _unidad(self):
        if self.__unidad is None:
            self.__unidad = Unidad()
        return self.__unidad
    
    @_unidad.setter
    def _unidad(self, value):
        self.__unidad = value
        
    @property
    def _lista(self):
        return self._list()
    
    @property
    def save(self):
        self.__unidad._id = self._lista._length + 1
        print("Guardando Unidad")
        self._save(self.__unidad)
        
    
    def merge(self, pos):
        self._merge(self.__unidad,pos)