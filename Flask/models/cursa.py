from models.estudiante import Estudiante
from models.asignacionDocente import AsignacionDocente


class Cursa:
    def __init__(self) -> None:
        self.__id = ''
        self.__estudiante = None
        self.__asignacionDocente = None
        self.__periodoAcademico = '12-20-24'

    @property
    def _id(self):
        return self.__id

    @_id.setter
    def _id(self, value):
        self.__id = value

    @property
    def _estudiante(self):
        if self.__estudiante is None:
            self.__estudiante = Estudiante()
        return self.__estudiante

    @_estudiante.setter
    def _estudiante(self, value):
        self.__estudiante = value

    @property
    def _asignacionDocente(self):
        if self.__asignacionDocente is None:
            self.__asignacionDocente = AsignacionDocente()
        return self.__asignacionDocente

    @_asignacionDocente.setter
    def _asignacionDocente(self, value):
        self.__asignacionDocente = value

    @property
    def _periodoAcademico(self):
        if self.__periodoAcademico is None:
            self.__periodoAcademico = '12-20-24'
        return self.__periodoAcademico

    @_periodoAcademico.setter
    def _periodoAcademico(self, value):
        self.__periodoAcademico = value
        
    @property
    def serialize(self):
        return {
            'id': self._id,
            'estudiante': self._estudiante,
            'asignacionDocente': self._asignacionDocente,
            'periodoAcademico': self._periodoAcademico
        }
        
    def deserialize(self, data):
        cursa = Cursa()
        cursa._id = data['id']
        cursa._estudiante = data['estudiante']
        cursa._asignacionDocente = data['asignacionDocente']
        cursa._periodoAcademico = data['periodoAcademico']
        return cursa

        
        