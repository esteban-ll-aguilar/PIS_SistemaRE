class Cuenta:
    def __init__(self):
        self.__id = 0
        self.__clave = ""
        self.__estado = False
        self.__correo = ""

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

    
    @property
    def serializable(self):
        return {
            "id": self._id,
            "clave": self._clave,
            "estado": self._estado,
            "correo": self._correo
        }
    
    
    def deserialize(self, data):
        cuenta = Cuenta()
        cuenta._id = data["id"]
        cuenta._clave = data["clave"]
        cuenta._estado = data["estado"]
        cuenta._correo = data["correo"]

        return cuenta 

    