class Rol:
    def __init__(self):
        self.__id = 0
        self.__nombre = ""

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
    def serializable(self):
        return {
            "id": self._id,
            "nombre": self._nombre
        }
    
    def deserialize(self, data):
        rol = Rol()
        rol._id = data["id"]
        rol._nombre = data["nombre"]
        return rol

        
    