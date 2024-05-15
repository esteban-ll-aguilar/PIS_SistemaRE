class estudianControl:
    def __init__(self):
        self.__estudiante = None
    
    def getEstudiante(self):
        if self.__estudiante is None:
            from models.estudiante import Estudiante
            self.__estudiante = Estudiante()
        return self.__estudiante
    
    def setEstudiante(self, value):
        self.__estudiante = value