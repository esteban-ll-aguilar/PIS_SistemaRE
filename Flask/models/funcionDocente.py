class FuncionDocente:
    def __init__(self):
        self.__id = 0
        self.__descripcion = ""
        self.__docenteUserCedula = ""
        self.__docenteUserId = ""

    @property
    def _id(self):
        return self.__id

    @_id.setter
    def _id(self, value):
        self.__id = value

    @property
    def _descripcion(self):
        return self.__descripcion

    @_descripcion.setter
    def _descripcion(self, value):
        self.__descripcion = value

    @property
    def _docenteUserCedula(self):
        return self.__docenteUserCedula

    @_docenteUserCedula.setter
    def _docenteUserCedula(self, value):
        self.__docenteUserCedula = value

    @property
    def _docenteUserId(self):
        return self.__docenteUserId

    @_docenteUserId.setter
    def _docenteUserId(self, value):
        self.__docenteUserId = value


    
        
    @property
    def serializable(self):
        return {
            "idFuncionDocente": self._id,
            "descripcion": self._descripcion,
            "docente_User_Cedula": self._docenteUserCedula,
            "docente_User_IdUser": self._docenteUserId
        }
    
    def deserialize(self, data):
        duncionDocente = FuncionDocente()
        duncionDocente._id = data["idFuncionDocente"]
        duncionDocente._descripcion = data["descripcion"]
        duncionDocente._docenteUserCedula = data["docente_User_Cedula"]
        duncionDocente._docenteUserId = data["docente_User_IdUser"]
        return duncionDocente

        
    