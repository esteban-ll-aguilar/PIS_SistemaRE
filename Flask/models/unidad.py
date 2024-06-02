class Unidad:
    def __init__(self):
        self.__id = 0
        self.__nombre = ""
        self.__rubricaCalificacionId = ""

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
    def _rubricaCalificacionId(self):
        return self.__rubricaCalificacionId

    @_rubricaCalificacionId.setter
    def _rubricaCalificacionId(self, value):
        self.__rubricaCalificacionId = value
        
    
    @property
    def serializable(self):
        return {
            "id": self._id,
            "nombre": self._nombre,
            "rubricaCalificacionId": self._rubricaCalificacionId
        }
    
    
    def deserialize(self, data):
        unidad = Unidad()
        unidad._id = data["id"]
        unidad._nombre = data["nombre"]
        unidad._rubricaCalificacionId = data["rubricaCalificacionId"]
        return unidad

    
        