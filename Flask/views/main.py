
import sys
sys.path.append('../')
from controls.functions.exelDocenteAsignate import ExelDocentesAsignate
from controls.functions.exelCursaAsignate import ExelCursaAsignate
from controls.periodoAcademicoDaoControl import PeriodoAcademicoDaoControl
eda = ExelDocentesAsignate(r"C:\Users\esteb\OneDrive\Escritorio\Estudios_Esteban\3-Ciclo\PIS\Docentes_AbrilAgosto2024.xlsx")
eca = ExelCursaAsignate(r"C:\Users\esteb\OneDrive\Escritorio\Estudios_Esteban\3-Ciclo\PIS\Estudiantes_AbrilAgosto2024.xlsx")
from controls.tda.ordenation_methods.quickSort import QuickSort
try:
    #eda.saveExel
    #eda.asignarDocente
    #eca.saveExel
    #eca.asignarEstudiante
    """ pacd = PeriodoAcademicoDaoControl()
    pacd._list()
    print(pacd.to_dict()) """
    eca.crearCursa(1)
    
    
    
    """ pacd._periodoAcademico._nombre = 'Enerrero 2024'
    pacd._periodoAcademico._fechaInicio = '01-01-2024'
    pacd._periodoAcademico._fechaFin = '31-05-2024'
    pacd.save """

    
except Exception as e:
    print('Error: '+str(e))
