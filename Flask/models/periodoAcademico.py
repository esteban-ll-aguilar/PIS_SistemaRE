class PeriodoAcademico:
    def __init__(self):
        self.__id = 0
        self.__nombre = ''
        self.__fechaInicio = ''
        self.__fechaFin = ''

    @property
    def _id(self):
        return self.__id

    @_id.setter
    def _id(self, value):
        self.__id = value

    @property
    def _nombre(self):
        return self.__nombre

    @_nombre.setter
    def _nombre(self, value):
        self.__nombre = value

    @property
    def _fechaInicio(self):
        return self.__fechaInicio

    @_fechaInicio.setter
    def _fechaInicio(self, value):
        self.__fechaInicio = value

    @property
    def _fechaFin(self):
        return self.__fechaFin

    @_fechaFin.setter
    def _fechaFin(self, value):
        self.__fechaFin = value


    

        
    @property
    def serializable(self):
        return {
            "idpac": self._id,
            "nombre": self._nombre,
            "fecha_inicio": self._fechaInicio,
            "fecha_fin": self._fechaFin
        }
        
    def deserialize(self, data):
        periodoAcademico = PeriodoAcademico()
        periodoAcademico._id = data['idpac']
        periodoAcademico._nombre = data['nombre']
        periodoAcademico._fechaInicio = data['fecha_inicio']
        periodoAcademico._fechaFin = data['fecha_fin']
        return periodoAcademico

        