
import sys
sys.path.append('../')
from controls.functions.exelDocenteAsignate import ExelDocentesAsignate
from controls.functions.exelCursaAsignate import ExelCursaAsignate
eda = ExelDocentesAsignate(r"C:\Users\esteb\OneDrive\Escritorio\Estudios_Esteban\3-Ciclo\PIS\Docentes_AbrilAgosto2024.xlsx")
eca = ExelCursaAsignate(r"C:\Users\esteb\OneDrive\Escritorio\Estudios_Esteban\3-Ciclo\PIS\Estudiantes_AbrilAgosto2024.xlsx")
try:
    # eda.saveExel
    #eda.asignarDocente
    eca.saveExel
    #eca.asignarEstudiante

    
except Exception as e:
    print('Error: '+str(e))
