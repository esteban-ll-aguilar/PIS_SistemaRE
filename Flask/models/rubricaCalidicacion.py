class RubriaCalificacion:
    def __init__(self):
        self.__id = 0
        self.__unidadId = 0
        self.__isCreate = False
        self.__lecciones = 0.0
        self.__contactoD = 0.0
        self.__actuvidadA = 0.0
        self.__examenU = 0.0
        self.__promedioU = 0.0

    @property
    def _id(self):
        return self.__id

    @_id.setter
    def _id(self, value):
        self.__id = value

    @property
    def _unidadId(self):
        return self.__unidadId

    @_unidadId.setter
    def _unidadId(self, value):
        self.__unidadId = value

    @property
    def _isCreate(self):
        return self.__isCreate

    @_isCreate.setter
    def _isCreate(self, value):
        self.__isCreate = value

    @property
    def _lecciones(self):
        return self.__lecciones

    @_lecciones.setter
    def _lecciones(self, value):
        self.__lecciones = value

    @property
    def _contactoD(self):
        return self.__contactoD

    @_contactoD.setter
    def _contactoD(self, value):
        self.__contactoD = value

    @property
    def _actuvidadA(self):
        return self.__actuvidadA

    @_actuvidadA.setter
    def _actuvidadA(self, value):
        self.__actuvidadA = value

    @property
    def _examenU(self):
        return self.__examenU

    @_examenU.setter
    def _examenU(self, value):
        self.__examenU = value

    @property
    def _promedioU(self):
        return self.__promedioU

    @_promedioU.setter
    def _promedioU(self, value):
        self.__promedioU = value

    @property
    def serializable(self):
        return {
            "id": self._id,
            "unidadId": self._unidadId,
            "isCreate": self._isCreate,
            "lecciones": self._lecciones,
            "contactoD": self._contactoD,
            "actuvidadA": self._actuvidadA,
            "examenU": self._examenU,
            "promedioU": self._promedioU
        }
        
    def deserialize(self, data):
        rubricaCalificacion = RubriaCalificacion()
        rubricaCalificacion._id = data["id"]
        rubricaCalificacion._unidadId = data["unidadId"]
        rubricaCalificacion._isCreate = data["isCreate"]
        rubricaCalificacion._lecciones = data["lecciones"]
        rubricaCalificacion._contactoD = data["contactoD"]
        rubricaCalificacion._actuvidadA = data["actuvidadA"]
        rubricaCalificacion._examenU = data["examenU"]
        rubricaCalificacion._promedioU = data["promedioU"]
        return rubricaCalificacion