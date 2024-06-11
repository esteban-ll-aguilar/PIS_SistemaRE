from controls.functions.exelDaoAdapter import ExelDaoAdapter
from controls.cursaDaoControl import CursaDaoControl
from controls.funcionDocenteDaoControl import FuncionDocente
from controls.estudianteDaoControl import EstudianteDaoControl
from controls.periodoAcademicoDaoControl import PeriodoAcademicoDaoControl
from controls.materiaDaoControl import MateriaDaoControl
from controls.functions.createmodel import CreateModel

class ExelCursaAsignate(ExelDaoAdapter):
    def __init__(self, file_path: str):
        super().__init__(ExelCursaAsignate,file_path)
        
    @property
    def saveExel(self):
        return self._saveExel
    
    @property
    def readExel(self):
        return self._readExel
    
    @property
    def asignarEstudiante(self):
        datos = self._readExel
        
            
        return 'Estudiantes asignados'

        
        
    
        
        
        
        