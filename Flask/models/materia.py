class Materia:
    #la materia tiene un id y un nombre y una clase ciclo
    def __init__(self):
        self.__id = 0
        self.__nombre = ""
        self.__cicloId = ''

    
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
    def _cicloId(self):
        return self.__cicloId

    @_cicloId.setter
    def _cicloId(self, value):
        self.__cicloId = value



    @property
    def serializable(self):
        return {
            "id": self._id,
            "nombre": self._nombre,
            "cicloId": self._cicloId
            
        }
    
    def deserialize(self, data):
        materia = Materia() 
        materia._id = data["id"]
        materia._nombre = data["nombre"]
        materia._cicloId = data["cicloId"]
        return materia


    
