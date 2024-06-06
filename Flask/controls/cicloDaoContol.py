from controls.dao.daoAdapter import DaoAdapter
from models.ciclo import Ciclo

class CicloDaoControl(DaoAdapter):
    def __init__(self):
        super().__init__(Ciclo)
        self.__ciclo = None

    @property
    def _ciclo(self):
        if self.__ciclo is None:
            self.__ciclo = Ciclo()
        return self.__ciclo
    
    @_ciclo.setter
    def _ciclo(self, value):
        self.__ciclo = value
        
    
    @property
    def _lista(self):
        return self._list()
    
    @property
    def save(self):
        self.__ciclo._id = self._lista._length + 1
        print("Guardando Ciclo")
        self._save(self.__ciclo)
        
        
    def merge(self, pos):
        self._merge(self.__ciclo,pos)