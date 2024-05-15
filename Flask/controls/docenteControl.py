import Flask.controls.personaControl as PersonaControl
import models.docente as Docente

class DocenteControl(PersonaControl):
    def __init__(self):
        super().__init__()

    def getDocente(self) -> Docente:
        if self._persona is None:
            self._persona = Docente()
        return self._persona
    
    def setDocente(self, value: Docente) -> None:
        self._persona = value