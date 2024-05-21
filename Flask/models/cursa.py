from models.estudiante import Estudiante
from models.asignacionDocente import AsignacionDocente


class Cursa:
    def __init__(self) -> None:
        self.__id = ''
        self.__estudiante = None
        self.__asignacionDocente = None
        self.__periodoAcademicoId = 0

    @property
    def _id(self):
        return self.__id

    @_id.setter
    def _id(self, value):
        self.__id = value

    @property
    def _estudiante(self):
        return self.__estudiante

    @_estudiante.setter
    def _estudiante(self, value):
        self.__estudiante = value

    @property
    def _asignacionDocente(self):
        return self.__asignacionDocente

    @_asignacionDocente.setter
    def _asignacionDocente(self, value):
        self.__asignacionDocente = value

    @property
    def _periodoAcademicoId(self):
        return self.__periodoAcademicoId

    @_periodoAcademicoId.setter
    def _periodoAcademicoId(self, value):
        self.__periodoAcademicoId = value


    
        
    @property
    def serialize(self):
        return {
            "id": self._id,
            "estudiante": self._estudiante,
            "asignacionDocente": self._asignacionDocente,
            "periodoAcademico": self._periodoAcademicoId   
        }
        
    def deserialize(self, data):
        cursa = Cursa()
        cursa._id = data['id']
        cursa._estudiante = data['estudiante']
        cursa._asignacionDocente = data['asignacionDocente']
        cursa._periodoAcademicoId = data['periodoAcademico']
        return cursa

        
        