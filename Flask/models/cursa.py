from models.estudiante import Estudiante
from models.asignacionDocente import AsignacionDocente


class Cursa:
    def __init__(self):
        self.__id = ''
        self.__estudianteId = 0
        self.__asignacionDocente = 0
        self.__periodoAcademicoId = 0
        self.__numeroMatricula = 1

    @property
    def _numeroMatricula(self):
        return self.__numeroMatricula

    @_numeroMatricula.setter
    def _numeroMatricula(self, value):
        if value < 0 or value == 0 or value >3:
            raise ValueError("El numero de matricula no puede ser negativo")
        self.__numeroMatricula = value

    @property
    def _id(self):
        return self.__id

    @_id.setter
    def _id(self, value):
        self.__id = value

    @property
    def _estudianteId(self):
        return self.__estudianteId

    @_estudianteId.setter
    def _estudianteId(self, value):
        self.__estudianteId = value

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
    def serializable(self):
        return {
            "id": self._id,
            "estudianteId": self._estudianteId,
            "numeroMatricula": self._numeroMatricula,
            "asignacionDocente": self._asignacionDocente,
            "periodoAcademico": self._periodoAcademicoId   
        }
        
    def deserialize(self, data):
        cursa = Cursa()
        cursa._id = data['id']
        cursa._estudianteId = data['estudianteId']
        cursa._numeroMatricula = data['numeroMatricula']
        cursa._asignacionDocente = data['asignacionDocente']
        cursa._periodoAcademicoId = data['periodoAcademico']
        return cursa

        
        