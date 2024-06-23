from controls.dao.daoAdapter import DaoAdapter
from models.materia import Materia

class MateriaDaoControl(DaoAdapter):
    def __init__(self):
        super().__init__(Materia)
        self.__materia = None

    @property
    def _materia(self):
        if self.__materia is None:
            self.__materia = Materia()
        return self.__materia
    
    @_materia.setter
    def _materia(self, value):
        self.__materia = value
        """ 
    def __exist__(self, nombre):
        for data in self._lista:
            if data._nombre == nombre:
                return True, data._id, data._nombre
        return False, None, None """
    
    def obtenerMateriaDeCiclo(self, cicloId):
        return self._lista.__obtenerMateriaDeCiclo__(cicloId)
    
    
    @property
    def _lista(self):
        return self._list()
    
    @property
    def save(self):
        self.__materia._id = self._lista._length + 1
        print("Guardando Materia")
        self._save(self.__materia)
        
    def delete(self, pos):
        self._delete(pos)  
        
    def merge(self, pos):
        self._merge(self.__materia,pos)
        
        