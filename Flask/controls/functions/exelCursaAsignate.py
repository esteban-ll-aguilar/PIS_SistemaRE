from controls.dao.exelDaoAdapter import ExelDaoAdapter
from controls.functions.exelDocenteAsignate import ExelDocentesAsignate
from controls.cursaDaoControl import CursaDaoControl
from controls.funcionDocenteDaoControl import FuncionDocenteDaoControl
from controls.estudianteDaoControl import EstudianteDaoControl
from controls.docenteDaoControl import DocenteDaoControl
from controls.periodoAcademicoDaoControl import PeriodoAcademicoDaoControl
from controls.materiaDaoControl import MateriaDaoControl
from controls.functions.createmodel import CreateModel
from controls.tda.linked.ordenation_methods.quickSort import QuickSort

class ExelCursaAsignate(ExelDaoAdapter):
    def __init__(self, archivo):
        super().__init__(ExelCursaAsignate,archivo)
        
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
        datosEstudiantes = self.readExel
        datosDocentes = ExelDocentesAsignate(None).readExel
        createModel = CreateModel()
        for docente in datosDocentes:
            existDocente, idDocente, cedulaDocente = DocenteDaoControl()._lista.__exist__(docente['Cedula'])
            existFuncionDocente, idFuncionDocente,_ = FuncionDocenteDaoControl()._lista.__exist__(data="DOCENTE", cedula=docente['Cedula'])
            existMateria, idMateria, cedulaMateriaDocente = MateriaDaoControl()._lista.__exist__(docente['Materia'], docente['Ciclo'])
            if not existDocente: idDocente, cedulaDocente = createModel.createDocente(docente)
            if not existMateria: idMateria = createModel.createMateria(docente)
            if not existFuncionDocente: idFuncionDocente = createModel.createFuncionDocente("DOCENTE", cedulaDocente)
        
            if existMateria:
                if cedulaMateriaDocente != docente['Cedula']:
                    materia = MateriaDaoControl().merge(idMateria)
        
        mdc = MateriaDaoControl()
        lista = mdc._lista.sort_models('_ciclo')
    
        
        
        for estudiante in datosEstudiantes:
            existEstudiante, idEstudiante, cedulaEstudiante = EstudianteDaoControl()._lista.__exist__(estudiante['Cedula'])
            if not existEstudiante: idEstudiante, cedulaEstudiante = createModel.createEstudiante(estudiante)
            listaciclos = mdc._lista.search_model(estudiante['Ciclo'], '_ciclo', 0)
            for materia in listaciclos:
                    cursa = CursaDaoControl()
                    cursa._cursa._estudianteCedula = cedulaEstudiante
                    cursa._cursa._materiaId = materia._id
                    cursa._cursa._paralelo = estudiante['Paralelo']
                    cursa._cursa._docenteCedula = materia._cedulaDocente
                    cursa._cursa._periodoAcademicoId = periodoAcademico
                    cursa.save
                    
            
        
        
        
        
        
        
        
    
        
        
        
        