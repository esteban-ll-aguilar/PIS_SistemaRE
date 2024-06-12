from controls.dao.exelDaoAdapter import ExelDaoAdapter
from controls.functions.exelDocenteAsignate import ExelDocentesAsignate
from controls.cursaDaoControl import CursaDaoControl
from controls.funcionDocenteDaoControl import FuncionDocenteDaoControl
from controls.estudianteDaoControl import EstudianteDaoControl
from controls.docenteDaoControl import DocenteDaoControl
from controls.periodoAcademicoDaoControl import PeriodoAcademicoDaoControl
from controls.materiaDaoControl import MateriaDaoControl
from controls.functions.createmodel import CreateModel
from controls.tda.ordenation_methods.quickSort import QuickSort

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

    
    def crearCursa(self, periodoAcademico):
        datosEstudiantes = self._readExel
        datosDocentes = ExelDocentesAsignate(None).readExel
        for docente in datosDocentes:
            existDocente, idDocente, cedulaDocente = DocenteDaoControl()._lista.__exist__(docente['Cedula'])
            existMateria, idMateria, _ = MateriaDaoControl()._lista.__exist__(docente['Materia'], docente['Ciclo'])
            if not existDocente: idDocente = CreateModel.createDocente(docente)
            if not existMateria: idMateria = CreateModel.createMateria(docente)
        
        """ mdc = MateriaDaoControl()
        lista = mdc._lista.toArray
        QuickSort().quick_sort_models(lista, '_ciclo')
        
        print(mdc.__transform__()) """
    
        
        
        """ for estudiante in datosEstudiantes:
            existEstudiante, idEstudiante, cedulaEstudinte = EstudianteDaoControl()._lista.__exist__(estudiante['Cedula'])
            if not existEstudiante: idEstudiante = CreateModel.createEstudiante(estudiante)
            
         """
        
        
        
        
        
        
    
        
        
        
        