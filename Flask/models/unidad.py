class Unidad:
    def __init__(self):
        self.__id = 0
        self.__nombre = ""
        self.__nUnidad = 0


    @property
    def _id(self):
        return self.__id

    @_id.setter
    def _id(self, value):
        self.__id = value

    @property
    def _nombre(self):
        return self.__nombre

    @_nombre.setter
    def _nombre(self, value):
        self.__nombre = value

    @property
    def _nUnidad(self):
        return self.__nUnidad

    @_nUnidad.setter
    def _nUnidad(self, value):
        self.__nUnidad = value

    
    
    @property
    def serializable(self):
        return {
            "idUnidad": self._id,
            "nombre": self._nombre,
            "nUnidad": self._nUnidad
        }
    
    
    def deserialize(self, data):
        unidad = Unidad()
        unidad._id = data["idUnidad"]
        unidad._nombre = data["nombre"]
        unidad._nUnidad = data["nUnidad"]
        return unidad

    
        