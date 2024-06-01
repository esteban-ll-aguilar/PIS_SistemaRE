# esta clase presenta una relacion con la clase materia

class Ciclo:
    def __init__(self):
        self.__id = id
        self.__ciclo = 0
        self.__paralelo = ''

#                              GETTERS AND SETTERS
#/////////////////////////////////////////////////////////////////////////////

    @property
    def _id(self):
        return self.__id

    @_id.setter
    def _id(self, value):
        self.__id = value

    @property
    def _ciclo(self):
        return self.__ciclo

    @_ciclo.setter
    def _ciclo(self, value):
        self.__ciclo = value

    @property
    def _paralelo(self):
        return self.__paralelo

    @_paralelo.setter
    def _paralelo(self, value):
        self.__paralelo = value
        
    @property 
    def serializable(self):
        return {
            "id": self._id,
            "ciclo": self._ciclo,
            "paralelo": self._paralelo
        }
    
    def deserialize(self, data):
        ciclo = Ciclo()
        ciclo._id = data["id"]
        ciclo._ciclo = data["ciclo"]
        ciclo._paralelo = data["paralelo"]
        return ciclo

#////////////////////////////////////////////////////////////////////////////

       
        