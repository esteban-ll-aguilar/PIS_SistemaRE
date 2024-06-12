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
        """datosDocentes = ExelDocentesAsignate(None).readExel
        for docente in datosDocentes:
            existDocente, idDocente, cedulaDocente = DocenteDaoControl()._lista.__exist__(docente['Cedula'])
            existFuncionDocente, idFuncionDocente,_ = FuncionDocenteDaoControl()._lista.__exist__("DOCENTE", cedulaDocente, idDocente)
            existMateria, idMateria, _ = MateriaDaoControl()._lista.__exist__(docente['Materia'], docente['Ciclo'], docente['Cedula'])
            if not existDocente: idDocente, cedulaDocente = CreateModel.createDocente(docente)
            if not existMateria: idMateria = CreateModel.createMateria(docente, idDocente)
            if not existFuncionDocente: CreateModel.createFuncionDocente("DOCENTE", cedulaDocente, idDocente)
         """
        mdc = MateriaDaoControl()
        mdc._lista.toArray
        mdc._lista.sort_models('_ciclo')
        lista = mdc._lista.toArray
    
        
        
        for estudiante in datosEstudiantes:
            existEstudiante, idEstudiante, cedulaEstudiante = EstudianteDaoControl()._lista.__exist__(estudiante['Cedula'])
            
            if not existEstudiante: idEstudiante, cedulaEstudiante = CreateModel.createEstudiante(estudiante)
            
            listaciclos = mdc._lista.search_models(estudiante['Ciclo'], '_ciclo')
            #print(listaciclos)
            for materia in listaciclos:
                    cursa = CursaDaoControl()
                    cursa._cursa._estudianteCedula = cedulaEstudiante
                    cursa._cursa._materiaId = materia._id
                    cursa._cursa._paralelo = estudiante['Paralelo']
                    cursa._cursa._docenteCedula = materia._cedulaDocente
                    cursa._cursa._periodoAcademicoId = periodoAcademico
                    cursa._cursa._docenteId = materia._docenteId
                    cursa._cursa._estudianteId = idEstudiante
                    cursa.save
                    
            
        
        
        
        
        
        
        
    
        
        
        
        