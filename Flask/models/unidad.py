class Unidad:
    def __init__(self):
        self.__id = 0
        self.__nombre = ""
        self.__nUnidad = 0
        self.__materiaId = 0

    @property
    def _materiaId(self):
        return self.__materiaId

    @_materiaId.setter
    def _materiaId(self, value):
        self.__materiaId = value


    

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
            "idunidad": self._id,
            "nombre": self._nombre,
            "nunidad": self._nUnidad,
            "materia_idmateria": self._materiaId
        }
    
    
    def deserialize(self, data):
        unidad = Unidad()
        unidad._id = data["idunidad"]
        unidad._nombre = data["nombre"]
        unidad._nUnidad = data["nunidad"]
        unidad._materiaId = data["materia_idmateria"]
        return unidad

    
        