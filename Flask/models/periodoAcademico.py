class PeridoAcademico:
    def __init__(self):
        self.__id = id
        self.__nombrePeriodoAcademico = ''

    @property
    def _nombrePeriodoAcademico(self):
        return self.__nombrePeriodoAcademico

    @_nombrePeriodoAcademico.setter
    def _nombrePeriodoAcademico(self, value):
        self.__nombrePeriodoAcademico = value

        

    @property
    def _id(self):
        return self.__id

    @_id.setter
    def _id(self, value):
        self.__id = value

        
    @property
    def serializable(self):
        return {
            "id": self._id,
            "nombrePeriodoAcademico": self._nombrePeriodoAcademico
        }
        
    def deserialize(self, data):
        periodoAcademico = PeridoAcademico()
        periodoAcademico._id = data['id']
        periodoAcademico._nombrePeriodoAcademico = data['nombrePeriodoAcademico']
        return periodoAcademico

        