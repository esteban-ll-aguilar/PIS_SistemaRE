from controls.dao.daoAdapter import DaoAdapter
from models.usuario import Usuario
from controls.db.crud.crudUsuario import CrudUsuario
class UsuarioDaoControl(DaoAdapter):
    def __init__(self):
        super().__init__(Usuario)
        self.__usuario = None
        self.__crud = CrudUsuario()
        
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
        self._lista._length =  self._lista._length + 1
        # print("Guardando Usuario")
        self.__crud.createUsuario(self.__usuario._id, self.__usuario._cedula,
                        self.__usuario._primerNombre, self.__usuario._segundoNombre,
                        self.__usuario._primerApellido, self.__usuario._segundoApellido,
                        self.__usuario._correo, self.__usuario._contrasena, self.__usuario._estado,
                        self.__usuario._urlImagen, self.__usuario._nombreUsuario)
    
    def delete(self):
        self.__crud.deleteUsuario(self.__usuario._id, self.__usuario._cedula,
                        self.__usuario._primerNombre, self.__usuario._segundoNombre,
                        self.__usuario._primerApellido, self.__usuario._segundoApellido,
                        self.__usuario._correo, self.__usuario._contrasena, self.__usuario._estado,
                        self.__usuario._urlImagen, self.__usuario._nombreUsuario)
        
    def merge(self):
        self.__crud.updateUsuario(self.__usuario._id, self.__usuario._cedula,
                        self.__usuario._primerNombre, self.__usuario._segundoNombre,
                        self.__usuario._primerApellido, self.__usuario._segundoApellido,
                        self.__usuario._correo, self.__usuario._contrasena, self.__usuario._estado,
                        self.__usuario._urlImagen, self.__usuario._nombreUsuario)