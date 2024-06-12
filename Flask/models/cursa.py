class Cursa:
    def __init__(self):
        self.__id = 0
        self.__estudianteCedula = 0
        self.__materiaId = 0
        self.__paralelo = 0
        self.__docenteedula = 0
        self.__numeroMMatricula = 1
        self.__periodoAcademicoId = 0
        self.__docenteId = 0
        self.__estudianteId = 0

    @property
    def _id(self):
        return self.__id

    @_id.setter
    def _id(self, value):
        self.__id = value

    @property
    def _estudianteCedula(self):
        return self.__estudianteCedula

    @_estudianteCedula.setter
    def _estudianteCedula(self, value):
        self.__estudianteCedula = value

    @property
    def _materiaId(self):
        return self.__materiaId

    @_materiaId.setter
    def _materiaId(self, value):
        self.__materiaId = value

    @property
    def _paralelo(self):
        return self.__paralelo

    @_paralelo.setter
    def _paralelo(self, value):
        self.__paralelo = value

    @property
    def _docenteedula(self):
        return self.__docenteedula

    @_docenteedula.setter
    def _docenteedula(self, value):
        self.__docenteedula = value

    @property
    def _numeroMMatricula(self):
        return self.__numeroMMatricula

    @_numeroMMatricula.setter
    def _numeroMMatricula(self, value):
        self.__numeroMMatricula = value

    @property
    def _periodoAcademicoId(self):
        return self.__periodoAcademicoId

    @_periodoAcademicoId.setter
    def _periodoAcademicoId(self, value):
        self.__periodoAcademicoId = value

    @property
    def _docenteId(self):
        return self.__docenteId

    @_docenteId.setter
    def _docenteId(self, value):
        self.__docenteId = value

    @property
    def _estudianteId(self):
        return self.__estudianteId

    @_estudianteId.setter
    def _estudianteId(self, value):
        self.__estudianteId = value

        
        
        

    

    


    
        
    @property
    def serializable(self):
        return {
            "idcursa": self._id,
            "estudiante_user_cedula": self._estudianteCedula,
            "materia_idmateria": self._materiaId,   
            "paralelo": self._paralelo,
            "docente_user_cedula": self._docenteedula,
            "numerommatricula": self._numeroMMatricula,
            "periodoacademico_idpac": self._periodoAcademicoId,
            "docente_user_iduser": self._docenteId,
            "estudiante_user_iduser": self._estudianteId
            
        }
        
    def deserialize(self, data):
        cursa = Cursa()
        cursa._id = data['idcursa']
        cursa._estudianteCedula = data['estudiante_user_cedula']
        cursa._materiaId = data['materia_idmateria']
        cursa._paralelo = data['paralelo']
        cursa._docenteedula = data['docente_user_cedula']
        cursa._numeroMMatricula = data['numerommatricula']
        cursa._periodoAcademicoId = data['periodoAcademico_idpac']
        cursa._docenteId = data['docente_user_iduser']
        cursa._estudianteId = data['estudiante_user_iduser']
        return cursa

        
        