from controls.dao.exelDaoAdapter import ExelDaoAdapter
from controls.materiaDaoControl import MateriaDaoControl
from controls.docenteDaoControl import DocenteDaoControl
from controls.periodoAcademicoDaoControl import PeriodoAcademicoDaoControl
from controls.funcionDocenteDaoControl import FuncionDocente
from controls.functions.createmodel import CreateModel

class ExelDocentesAsignate(ExelDaoAdapter):
    def __init__(self, archivo):
        super().__init__(ExelDocentesAsignate, archivo)
        

    @property
    def saveExel(self):
        return self._saveExel
    
    @property
    def readExel(self):
        return self._readExel
    
    