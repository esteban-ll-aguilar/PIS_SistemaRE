from controls.functions.exelDaoAdapter import ExelDaoAdapter
from controls.cursaDaoControl import CursaDaoControl
from controls.estudianteDaoControl import EstudianteDaoControl
from controls.asignacionDocenteDaoControl import AsignacionDocenteDaoControl
from controls.periodoAcademicoDaoControl import PeriodoAcademicoDaoControl
from controls.periodoAcademicoDaoControl import PeriodoAcademicoDaoControl


class ExelCursaAsignate(ExelDaoAdapter):
    def __init__(self, file_path: str):
        super().__init__(CursaDaoControl, file_path)
        self.__cursaDaoControl = None
        self.__estudianteDaoControl = None
        self.__asignacionDocenteId = None
        self.__periodoAcademicoId = None

    @property
    def _cursaDaoControl(self):
        if self.__cursaDaoControl is None:
            self.__cursaDaoControl = CursaDaoControl()
        return self.__cursaDaoControl

    @_cursaDaoControl.setter
    def _cursaDaoControl(self, value):
        self.__cursaDaoControl = value

    @property
    def _estudianteDaoControl(self):
        if self.__estudianteDaoControl is None:
            self.__estudianteDaoControl = EstudianteDaoControl()
        return self.__estudianteDaoControl

    @_estudianteDaoControl.setter
    def _estudianteDaoControl(self, value):
        self.__estudianteDaoControl = value

    @property
    def _asignacionDocenteId(self):
        if self.__asignacionDocenteId is None:
            self.__asignacionDocenteId = AsignacionDocenteDaoControl()
        return self.__asignacionDocenteId

    @_asignacionDocenteId.setter
    def _asignacionDocenteId(self, value):
        self.__asignacionDocenteId = value

    @property
    def _periodoAcademicoId(self):
        if self.__periodoAcademicoId is None:
            self.__periodoAcademicoId = PeriodoAcademicoDaoControl()
        return self.__periodoAcademicoId

    @_periodoAcademicoId.setter
    def _periodoAcademicoId(self, value):
        self.__periodoAcademicoId = value

        
        
    
        
        
        
        