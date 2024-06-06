class Rol:
    def __init__(self):
        self.__id = 0
        self.__nombreRol = ""

    @property
    def _id(self):
        return self.__id
 
    @_id.setter
    def _id(self, value):
        self.__id = value

    @property
    def _nombreRol(self):
        return self.__nombreRol

    @_nombreRol.setter
    def _nombreRol(self, value):
        self.__nombreRol = value
        
    @property
    def serializable(self):
        return {
            "id": self._id,
            "nombreRol": self._nombreRol
        }
    
    def deserialize(self, data):
        rol = Rol()
        rol._id = data["id"]
        rol._nombreRol = data["nombre"]
        return rol

        
    