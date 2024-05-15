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

    def save(self):
        self._materia._id = self._lista._length + 1
        self._lista.addAt(self.__materia, self._lista._length)