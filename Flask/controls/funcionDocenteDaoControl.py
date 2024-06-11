from controls.dao.daoAdapter import DaoAdapter
from models.funcionDocente import FuncionDocente

class FuncionDocenteDaoControl(DaoAdapter):
    def __init__(self):
        super().__init__(FuncionDocente)
        self.__rol = None
        
    @property
    def _rol(self):
        if self.__rol is None:
            self.__rol = FuncionDocente()
        return self.__rol
    
    @_rol.setter
    def _rol(self, value):
        self.__rol = value
        
    @property
    def _lista(self):
        return self._list()
    
    @property
    def save(self):
        self.__rol._id = self._lista._length + 1
        print("Guardando Rol")
        self._save(self.__rol)
        
    def merge(self, pos):
        self._merge(self.__rol,pos)
        