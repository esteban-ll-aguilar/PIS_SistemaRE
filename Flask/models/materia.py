class Materia:
    #la materia tiene un id y un nombre y una clase ciclo
    def __init__(self):
        self.__id = 0
        self.__nombreMateria = ""
        self.__cicloId = ''

    @property
    def _id(self):
        return self.__id

    @_id.setter
    def _id(self, value):
        self.__id = value

    @property
    def _nombreMateria(self):
        return self.__nombreMateria

    @_nombreMateria.setter
    def _nombreMateria(self, value):
        self.__nombreMateria = value

    @property
    def _cicloId(self):
        return self.__cicloId

    @_cicloId.setter
    def _cicloId(self, value):
        self.__cicloId = value



    @property
    def serializable(self):
        return {
            "id": self._id,
            "nombre": self._nombreMateria,
            "cicloId": self._cicloId
            
        }
    
    def deserialize(self, data):
        materia = Materia() 
        materia._id = data["id"]
        materia._nombreMateria = data["nombre"]
        materia._cicloId = data["cicloId"]
        return materia



    
