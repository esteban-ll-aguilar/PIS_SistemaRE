from controls.dao.daoAdapter import DaoAdapter
from models.funcionDocente import FuncionDocente

class FuncionDocenteDaoControl(DaoAdapter):
    def __init__(self):
        super().__init__(FuncionDocente)
        self.__funcionDocente = None
        
    @property
    def _funcionDocente(self):
        if self.__funcionDocente is None:
            self.__funcionDocente = FuncionDocente()
        return self.__funcionDocente
    
    @_funcionDocente.setter
    def _funcionDocente(self, value):
        self.__funcionDocente = value
        
    @property
    def _lista(self):
        return self._list()
    
    @property
    def save(self):
        self.__funcionDocente._id = self._lista._length + 1
        print("Guardando Rol")
        self._save(self.__funcionDocente)
        
    def delete(self, pos):
        self._delete(pos)  
        
    def merge(self, pos):
        self._merge(self.__funcionDocente,pos)
        