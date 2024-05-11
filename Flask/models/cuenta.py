class Cuenta:
    def __init__(self) -> None:
        self.__id = 0
        self.__clave = ''
        self.__estado = False
        self.__correo = ''

    @property
    def _id(self):
        return self.__id

    @_id.setter
    def _id(self, value):
        self.__id = value

    @property
    def _clave(self):
        return self.__clave

    @_clave.setter
    def _clave(self, value):
        self.__clave = value

    @property
    def _estado(self):
        return self.__estado

    @_estado.setter
    def _estado(self, value):
        self.__estado = value

    @property
    def _correo(self):
        return self.__correo

    @_correo.setter
    def _correo(self, value):
        self.__correo = value
