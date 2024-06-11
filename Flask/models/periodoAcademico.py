class PeridoAcademico:
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
            "idPAc": self._id,
            "nombre": self._nombre,
            "fecha_Inicio": self._fechaInicio,
            "fecha_Fin": self._fechaFin
        }
        
    def deserialize(self, data):
        periodoAcademico = PeridoAcademico()
        periodoAcademico._id = data['idPAc']
        periodoAcademico._nombre = data['nombre']
        periodoAcademico._fechaInicio = data['fechaInicio']
        periodoAcademico._fechaFin = data['fechaFin']
        return periodoAcademico

        