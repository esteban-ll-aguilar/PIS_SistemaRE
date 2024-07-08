from controls.dao.daoAdapter import DaoAdapter
from models.usuario import Usuario
class UsuarioDaoControl(DaoAdapter):
    def __init__(self):
        super().__init__(Usuario)
        self.__usuario = None
        
    @property
    def _usuario(self):
        if self.__usuario is None:
            self.__usuario = Usuario()
        return self.__usuario
    
    @_usuario.setter
    def _usuario(self, value):
        self.__usuario = value
        
    
    @property
    def _lista(self):
        return self._list()
    
    @property
    def save(self):
        self.__usuario._id = self._lista._length + 1
        print("Guardando Usuario")
        self._save(self.__usuario)
    
    def delete(self, pos):
        self._delete(pos)  
        
    def merge(self):
        self._merge(self.__usuario)