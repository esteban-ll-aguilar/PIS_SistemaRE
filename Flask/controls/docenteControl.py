class DocenteControl:
    def __init__(self):
        self.__docente = None

    def getDocente(self):
        if self.__docente is None:
            from models.docente import Docente
            self.__docente = Docente()
        return self.__docente
    
    def setDocente(self, value):
        self.__docente = value