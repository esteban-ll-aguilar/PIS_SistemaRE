from models.administrador import Administrador
from controls.DAO.daoAdapter import DaoAdapter


class AdministradorDaoControl(DaoAdapter):
    def __init__(self):
        super().__init__(Administrador)
        self.__administrador = None
        
    @property
    def _administrador(self):
        if self.__administrador is None:
            self.__administrador = Administrador()
        return self.__administrador
    
    @_administrador.setter
    def _administrador(self, value):
        self.__administrador = value
        
    @property
    def _lista(self):
        return self._list()
    
    @property
    def save(self):
        self.__administrador._id = self._lista._length + 1
        print("Guardando Administrador")
        self._save(self.__administrador)
        
    
        