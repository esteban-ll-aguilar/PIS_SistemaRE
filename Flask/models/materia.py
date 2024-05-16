class Materia:
    #la materia tiene un id y un nombre y una clase ciclo
    def __init__(self):
        self.__id = 0
        self.__nombre = ""
        self.__ciclo = None

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
        if self.__ciclo is None:
            """ from controls.cicloDaoContol import CicloDaoControl
            self.__ciclo = CicloDaoControl() """
            from models.ciclo import Ciclo
            self.__ciclo = Ciclo()
        return self.__ciclo

    @_ciclo.setter
    def _ciclo(self, value):
        self.__ciclo = value

    @property
    def serializable(self):
        return {
            "id": self.__id,
            "nombre": self.__nombre,
            "ciclo": self.__ciclo.serializable
        }
    
    def deserialize(self, data):
        materia = Materia() 
        materia._id = data["id"]
        materia._nombre = data["nombre"]
        materia._ciclo = self.__ciclo.deserialize(data["ciclo"])
        return materia



    
