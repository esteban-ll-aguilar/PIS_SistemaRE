class Usuario:
    def __init__(self):
        self.__id = 0
        self.__cedula = ""
        self.__nombres = ""
        self.__apellidos = ""
        self.__correo = ""
        self.__contrasena = ""
        self.__estado = True
        self.__urlImagen = 'NULL'
        self.__nombreUsuario = 'NULL'

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
    def _nombres(self):
        return self.__nombres

    @_nombres.setter
    def _nombres(self, value):
        self.__nombres = value

    @property
    def _apellidos(self):
        return self.__apellidos

    @_apellidos.setter
    def _apellidos(self, value):
        self.__apellidos = value

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



    
        

        