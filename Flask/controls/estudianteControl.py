import Flask.controls.personaControl as PersonaControl
import models.estudiante as Estudiante

class estudianControl(PersonaControl):
    def __init__(self):
        super().__init__()
    
    def getEstudiante(self) -> Estudiante:
        if self.__estudiante is None:
            self.__estudiante = Estudiante()
        return self.__estudiante
    
    def setEstudiante(self, value: Estudiante) -> None:
        self.__estudiante = value