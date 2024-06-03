from controls.functions.exelDaoAdapter import ExelDaoAdapter
from controls.cursaDaoControl import CursaDaoControl
from controls.rolDaoControl import RolDaoControl
from controls.cuentaDaoControl import CuentaDaoControl
from controls.estudianteDaoControl import EstudianteDaoControl
from controls.periodoAcademicoDaoControl import PeriodoAcademicoDaoControl
from controls.cicloDaoContol import CicloDaoControl
from controls.materiaDaoControl import MateriaDaoControl
from controls.asignacionDocenteDaoControl import AsignacionDocenteDaoControl
from controls.functions.createmodel import CreateModel

class ExelCursaAsignate(ExelDaoAdapter):
    def __init__(self, file_path: str):
        super().__init__(CursaDaoControl, file_path)
        
    @property
    def saveExel(self):
        return self._saveExel
    
    @property
    def readExel(self):
        return self._readExel
    
    @property
    def asignarEstudiante(self):
        datos = self._readExel
        for data in datos:
            existRol, idRol, _ = RolDaoControl()._lista.__exist__('ESTUDIANTE')
            existCuenta, idCuenta, _ = CuentaDaoControl()._lista.__exist__(data['Correo'])
            _, _, CedulaEstudiante = EstudianteDaoControl()._lista.__exist__(data['Cedula'])
            print(data['PeriodoAcademico'])
            _, idPeriodoAc, _ = PeriodoAcademicoDaoControl()._lista.__exist__(data['PeriodoAcademico'])
            _, idCiclo, _ = CicloDaoControl()._lista.__exist__(data['Ciclo'], data['Paralelo'])
            print(idCiclo)
            materiasId = MateriaDaoControl().obtenerMateriaDeCiclo(idCiclo)
            asignacionesId = AsignacionDocenteDaoControl().obtenerAsignacionDeMateria(materiasId)
            
            
            
            
            if not existRol: idRol = CreateModel.createRol('ESTUDIANTE')
            if not existCuenta: idCuenta = CreateModel.createCuenta(data)
            if not CedulaEstudiante: CedulaEstudiante = CreateModel.createEstudiante(data, idCuenta, idRol)
            
            for i in range(len(asignacionesId)):
                asignateEstudiante = CursaDaoControl()
                asignateEstudiante._cursa._estudianteId = CedulaEstudiante
                asignateEstudiante._cursa._asignacionDocenteId = asignacionesId[i]
                asignateEstudiante._cursa._periodoAcademicoId = idPeriodoAc
                asignateEstudiante.save
            
            
            
        return 'Estudiantes asignados'

        
        
    
        
        
        
        