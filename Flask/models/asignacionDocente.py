class AsignacionDocente:
    def __init__(self):
        self.__id = ''
        self.__cedulaId = 0
        self.__periodoAcademicoId = 0
        self.__unidadId = 0
        self.__materia = 0

    @property
    def _id(self):
        return self.__id

    @_id.setter
    def _id(self, value):
        self.__id = value

    @property
    def _cedulaId(self):
        return self.__cedulaId

    @_cedulaId.setter
    def _cedulaId(self, value):
        self.__cedulaId = value

    @property
    def _periodoAcademicoId(self):
        return self.__periodoAcademicoId

    @_periodoAcademicoId.setter
    def _periodoAcademicoId(self, value):
        self.__periodoAcademicoId = value

    @property
    def _unidadId(self):
        return self.__unidadId

    @_unidadId.setter
    def _unidadId(self, value):
        self.__unidadId = value

    @property
    def _materia(self):
        return self.__materia

    @_materia.setter
    def _materia(self, value):
        self.__materia = value


    
    @property
    def serializable(self):
        return {
            "id": self._id,
            "cedulaId": self._cedulaId,
            "periodoAcademicoId": self._periodoAcademicoId,
            "unidadId": self._unidadId,
            "materia": self._materia
        }
    
    def deserialize(self, data):
        docente = AsignacionDocente()
        docente._id = data["id"]
        docente._cedulaId = data["cedulaId"]
        docente._periodoAcademicoId = data["periodoAcademicoId"]
        docente._unidadId = data["unidadId"]
        docente._materia = data["materia"]
        return docente
    
