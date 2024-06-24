class RubricaCF:
    def __init__(self):
        self.__id = 0
        self.__descripcion = ""

    @property
    def _id(self):
        return self.__id

    @_id.setter
    def _id(self, value):
        self.__id = value

    @property
    def _descripcion(self):
        return self.__descripcion

    @_descripcion.setter
    def _descripcion(self, value):
        self.__descripcion = value


    @property
    def serializable(self):
        return {
            "idrcal": self._id,
            "descripcion": self._descripcion
        }
        
    def deserialize(self, data):
        rubricaCalificacion = RubricaCF()
        rubricaCalificacion._id = data["idrcal"]
        rubricaCalificacion._descripcion = data["descripcion"]
        return rubricaCalificacion