
import sys
sys.path.append('../')
from controls.functions.exelDocenteAsignate import ExelDocentesAsignate
from controls.functions.exelCursaAsignate import ExelCursaAsignate
from controls.periodoAcademicoDaoControl import PeriodoAcademicoDaoControl
#Esteban
#eda = ExelDocentesAsignate(r"C:\Users\esteb\OneDrive\Escritorio\Estudios_Esteban\3-Ciclo\PIS\Docentes_AbrilAgosto2024.xlsx")
#eca = ExelCursaAsignate(r"C:\Users\esteb\OneDrive\Escritorio\Estudios_Esteban\3-Ciclo\PIS\Estudiantes_AbrilAgosto2024.xlsx")
#Christian
eda = ExelDocentesAsignate(r"C:\Users\Asus\Downloads\Docentes_AbrilAgosto2024.xlsx")
eca = ExelCursaAsignate(r"C:\Users\Asus\Downloads\Estudiantes_AbrilAgosto2024.xlsx")
try:
    eda.saveExel
    eca.saveExel
    eca.asignarEstudiante
    
    eca.crearCursa(1)
    
    
    
    
    """ pacd = PeriodoAcademicoDaoControl()
    pacd._periodoAcademico._nombre = 'Enero 2024'
    pacd._periodoAcademico._fechaInicio = '01-01-2024'
    pacd._periodoAcademico._fechaFin = '31-05-2024'
    pacd.save  """

    
except Exception as e:
    print('Error: '+str(e))
