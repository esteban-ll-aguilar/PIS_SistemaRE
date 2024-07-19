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
        print(self._lista.get_final_Id)
        self.__funcionDocente._id = self._lista.get_final_Id + 1
        print("Guardando Rol")
        self._save(self.__funcionDocente)
        
    def delete(self):
        self._delete(self.__funcionDocente)  
        
    def merge(self):
        self._merge(self.__funcionDocente)
        