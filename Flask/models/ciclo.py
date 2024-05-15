# esta clase presenta una relacion con la clase materia

class Ciclo:
        
    def __init__(self, id, nombre, paralelo):
        self.__id = id
        self.__nombre = nombre
        self.__paralelo = paralelo

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

#////////////////////////////////////////////////////////////////////////////

       
        