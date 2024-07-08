class Usuario:
    def __init__(self):
        self.__id = 0
        self.__cedula = ""
        self.__primerNombre = ""
        self.__segundoNombre = "NULL"
        self.__primerApellido = ""
        self.__segundoApellido = "NULL"
        self.__correo = ""
        self.__contrasena = 'NULL'
        self.__estado = 0
        self.__urlImagen = 'NULL'
        self.__nombreUsuario = 'NULL'
        

    @property
    def _primerNombre(self):
        return self.__primerNombre

    @_primerNombre.setter
    def _primerNombre(self, value):
        self.__primerNombre = value

    @property
    def _segundoNombre(self):
        return self.__segundoNombre

    @_segundoNombre.setter
    def _segundoNombre(self, value):
        self.__segundoNombre = value

    @property
    def _primerApellido(self):
        return self.__primerApellido

    @_primerApellido.setter
    def _primerApellido(self, value):
        self.__primerApellido = value

    @property
    def _segundoApellido(self):
        return self.__segundoApellido

    @_segundoApellido.setter
    def _segundoApellido(self, value):
        self.__segundoApellido = value


    @property
    def _id(self):
        return self.__id

    @_id.setter
    def _id(self, value):
        self.__id = value

    @property
    def _cedula(self):
        return self.__cedula

    @_cedula.setter
    def _cedula(self, value):
        self.__cedula = value

    @property
    def _correo(self):
        return self.__correo

    @_correo.setter
    def _correo(self, value):
        self.__correo = value

    @property
    def _contrasena(self):
        return self.__contrasena

    @_contrasena.setter
    def _contrasena(self, value):
        self.__contrasena = value

    @property
    def _estado(self):
        return self.__estado

    @_estado.setter
    def _estado(self, value):
        self.__estado = value

    @property
    def _urlImagen(self):
        return self.__urlImagen

    @_urlImagen.setter
    def _urlImagen(self, value):
        self.__urlImagen = value

    @property
    def _nombreUsuario(self):
        return self.__nombreUsuario

    @_nombreUsuario.setter
    def _nombreUsuario(self, value):
        self.__nombreUsuario = value



    @property
    def serializable(self):
        return {
            "user_iduser": self._id,
            "user_cedula": self._cedula,
            "user_primer_nombre": self._primerNombre,
            "user_segundo_nombre": self._segundoNombre,
            "user_primer_apellido": self._primerApellido,
            "user_segundo_apellido": self._segundoApellido,
            "user_correo": self._correo,
            "user_contrasena": self._contrasena,
            "user_estado": self._estado,
            "user_urlimage": self._urlImagen,
            "user_nombreuser": self._nombreUsuario
        }
        
    def deserialize(self, data):
        usuario = Usuario()
        usuario._id = data['user_iduser']
        usuario._cedula = data['user_cedula']
        usuario._primerNombre = data['user_primer_nombre']
        usuario._segundoNombre = data['user_segundo_nombre']
        usuario._primerApellido = data['user_primer_apellido']
        usuario._segundoApellido = data['user_segundo_apellido']
        usuario._correo = data['user_correo']
        usuario._contrasena = data['user_contrasena']
        usuario._estado = data['user_estado']
        usuario._urlImagen = data['user_urlimage']
        usuario._nombreUsuario = data['user_nombreuser']
        return usuario
        


    
        

        