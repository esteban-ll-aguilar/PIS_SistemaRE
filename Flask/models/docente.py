from models.usuario import Usuario

class Docente(Usuario): 
    def __init__(self):
        super().__init__()
        self.__cubiculo = ''

    @property
    def _cubiculo(self):
        return self.__cubiculo

    @_cubiculo.setter
    def _cubiculo(self, value):
        self.__cubiculo = value


    @property
    def serializable(self):
        return {
            "user_IdUser": self._id,
            "user_Cedula": self._cedula,
            'user_Nombres': self._nombres,
            'user_Apellidos': self._apellidos,
            'user_Correo': self._correo,
            'user_Contrasena': self._contrasena,
            'user_Estado': self._estado,
            'user_UrlImagen': self._urlImagen,
            'user_NombreUser': self._nombreUsuario,
            'cubiculo': self._cubiculo
            
        }

    def deserialize(self, data):
        docente = Docente()
        docente._id = data['user_IdUser']
        docente._cedula = data['user_Cedula']
        docente._nombres = data['user_Nombres']
        docente._apellidos = data['user_Apellidos']
        docente._correo = data['user_Correo']
        docente._contrasena = data['user_Contrasena']
        docente._estado = data['user_Estado']
        docente._urlImagen = data['user_UrlImagen']
        docente._nombreUsuario = data['user_NombreUser']
        docente._cubiculo = data['cubiculo']
        
        return docente

        
        
    