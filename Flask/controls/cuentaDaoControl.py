from controls.dao.daoAdapter import DaoAdapter
from models.cuenta import Cuenta

class CuentaDaoControl(DaoAdapter):
    def __init__(self):
        super().__init__(Cuenta)
        self.__cuenta = None
        
    @property
    def _cuenta(self):
        if self.__cuenta is None:
            self.__cuenta = Cuenta()
        return self.__cuenta
    
    @_cuenta.setter
    def _cuenta(self, value):
        self.__cuenta = value
        
    
    @property
    def _lista(self):
        return self._list()
    
    @property
    def save(self):
        self.__cuenta._id = self._lista._length + 1
        print("Guardando Cuenta")
        self._save(self.__cuenta)
        
        
    def merge(self, pos):
        self._merge(self.__cuenta,pos)
        
    