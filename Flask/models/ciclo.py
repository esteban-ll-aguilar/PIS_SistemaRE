# esta clase presenta una relacion con la clase materia

class Ciclo:
    def __init__(self):
        self.__id = id
        self.__nombre = ''
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
    def _nombre(self):
        return self.__nombre

    @_nombre.setter
    def _nombre(self, value):
        self.__nombre = value

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
            "nombre": self._nombre,
            "paralelo": self._paralelo
        }
    
    def deserialize(self, data):
        ciclo = Ciclo()
        ciclo._id = data["id"]
        ciclo._nombre = data["nombre"]
        ciclo._paralelo = data["paralelo"]
        return ciclo

#////////////////////////////////////////////////////////////////////////////

       
        