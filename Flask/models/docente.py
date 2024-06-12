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
            "user_iduser": self._id,
            "user_cedula": self._cedula,
            'user_nombres': self._nombres,
            'user_apellidos': self._apellidos,
            'user_correo': self._correo,
            'user_contrasena': self._contrasena,
            'user_estado': self._estado,
            'user_urlimage': self._urlImagen,
            'user_nombreuser': self._nombreUsuario,
            'cubiculo': self._cubiculo
        }

    def deserialize(self, data):
        docente = Docente()
        docente._id = data['user_iduser']
        docente._cedula = data['user_cedula']
        docente._nombres = data['user_nombres']
        docente._apellidos = data['user_apellidos']
        docente._correo = data['user_correo']
        docente._contrasena = data['user_contrasena']
        docente._estado = data['user_estado']
        docente._urlImagen = data['user_urlimage']
        docente._nombreUsuario = data['user_nombreuser']
        docente._cubiculo = data['cubiculo']
        
        return docente

        
        
    