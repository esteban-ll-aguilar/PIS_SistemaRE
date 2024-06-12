class Materia:
    #la materia tiene un id y un nombre y una clase ciclo
    def __init__(self):
        self.__id = 0
        self.__nombre = ""
        self.__ciclo = 0
        self.__cedulaDocente = ''
        self.__docenteId = 0

    @property
    def _docenteId(self):
        return self.__docenteId

    @_docenteId.setter
    def _docenteId(self, value):
        self.__docenteId = value


    @property
    def _cedulaDocente(self):
        return self.__cedulaDocente

    @_cedulaDocente.setter
    def _cedulaDocente(self, value):
        self.__cedulaDocente = value

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
    def _ciclo(self):
        return self.__ciclo

    @_ciclo.setter
    def _ciclo(self, value):
        self.__ciclo = value


    



    @property
    def serializable(self):
        return {
            "idmateria": self._id,
            "nombre": self._nombre,
            "ciclo": self._ciclo,
            "docente_user_cedula": self._cedulaDocente,
            "docente_user_iduser": self._docenteId
            
        }
    
    def deserialize(self, data):
        materia = Materia() 
        materia._id = data["idmateria"]
        materia._nombre = data["nombre"]
        materia._ciclo = data["ciclo"]
        materia._cedulaDocente = data["docente_user_cedula"]
        materia._docenteId = data["docente_user_iduser"]
        return materia


    
