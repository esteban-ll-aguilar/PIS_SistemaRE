class PeridoAcademico:
    def __init__(self):
        self.__id = id
        self.__nombre = ''

    @property
    def _nombre(self):
        return self.__nombre

    @_nombre.setter
    def _nombre(self, value):
        self.__nombre = value

        

    @property
    def _id(self):
        return self.__id

    @_id.setter
    def _id(self, value):
        self.__id = value

        
    @property
    def serializable(self):
        return {
            "id": self._id,
            "nombre": self._nombre
        }
        
    def deserialize(self, data):
        periodoAcademico = PeridoAcademico()
        periodoAcademico._id = data['id']
        periodoAcademico._nombre = data['nombre']
        return periodoAcademico

        