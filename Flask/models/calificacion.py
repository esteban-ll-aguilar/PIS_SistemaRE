class Calificacion:
    def __init__(self) -> None:
        self.__id = 0
        self.__valor = 0
        self.__rubricaCalificacionId = 0
        self.__unidadId = 0
        self.__cursaId = 0

    @property
    def _id(self):
        return self.__id

    @_id.setter
    def _id(self, value):
        self.__id = value

    @property
    def _valor(self):
        return self.__valor

    @_valor.setter
    def _valor(self, value):
        self.__valor = value

    @property
    def _rubricaCalificacionId(self):
        return self.__rubricaCalificacionId

    @_rubricaCalificacionId.setter
    def _rubricaCalificacionId(self, value):
        self.__rubricaCalificacionId = value

    @property
    def _unidadId(self):
        return self.__unidadId

    @_unidadId.setter
    def _unidadId(self, value):
        self.__unidadId = value

    @property
    def _cursaId(self):
        return self.__cursaId

    @_cursaId.setter
    def _cursaId(self, value):
        self.__cursaId = value


    @property
    def serializable(self):
        return {
            "idcalificacion": self._id,
            "valor": self._valor,
            "rubricacf_idrcal": self._rubricaCalificacionId,
            "unidad_idunidad": self._unidadId,
            "cursa_idcursa": self._cursaId
        }
        
    def deserialize(self, data):
        calificacion = Calificacion()
        calificacion._id = data["idcalificacion"]
        calificacion._valor = data["valor"]
        calificacion._rubricaCalificacionId = data["rubricacf_idrcal"]
        calificacion._unidadId = data["unidad_idunidad"]
        calificacion._cursaId = data["cursa_idcursa"]
        return calificacion