from models.ciclo import Ciclo
from models.materia import Materia

class CicloControl:
    def __init__(self):
        self.__ciclo = None

    def getCiclo(self):
        if self.__ciclo is None:
            self.__ciclo = Ciclo()
        return self.__ciclo

    def setCiclo(self, value):
        self.__ciclo = value

    
# funciones que permitiran al ciclo agregar materias.

    def agregarMateria(self, Materia):
        self.__ciclo.agregarMateria(Materia)

    
