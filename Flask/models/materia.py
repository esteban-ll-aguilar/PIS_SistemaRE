class Materia:
    #la materia tiene un id y un nombre y una clase ciclo
    def __init__(self):
        self.__id = 0
        self.__nombre = ""
        #self.__ciclo = None

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
    def _ciclo(self):
        return self.__ciclo

    @_ciclo.setter
    def _ciclo(self, value):
        self.__ciclo = value


#def de str con id y nombre
    def __str__(self):
        return f"{self.__id} - {self.__nombre}"
    
