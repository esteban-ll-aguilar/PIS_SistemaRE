from models.materia import Materia
class MateriaControl:
    def __init__(self):
        self.__materia = None

    def getMateria(self):
        if self.__materia is None:
            self.__materia = Materia()
        return self.__materia

    def setMateria(self, value):
        self.__materia = value
