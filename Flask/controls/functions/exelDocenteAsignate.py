from controls.functions.exelDaoAdapter import ExelDaoAdapter
from controls.materiaDaoControl import MateriaDaoControl
from controls.docenteDaoControl import DocenteDaoControl
from controls.periodoAcademicoDaoControl import PeriodoAcademicoDaoControl
from controls.funcionDocenteDaoControl import FuncionDocente
from controls.functions.createmodel import CreateModel

class ExelDocentesAsignate(ExelDaoAdapter):
    def __init__(self, file_path: str):
        super().__init__(ExelDocentesAsignate, file_path)
        

    @property
    def saveExel(self):
        return self._saveExel
    
    @property
    def readExel(self):
        return self._readExel
    
    