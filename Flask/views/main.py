
import sys
sys.path.append('../')
from controls.functions.exelDocenteAsignate import ExelDocentesAsignate

rxl = ExelDocentesAsignate(r"C:\Users\esteb\OneDrive\Escritorio\Estudios_Esteban\3-Ciclo\PIS\Docentes_AbrilAgosto2024.xlsx")

try:
    #rxl.saveExel
    #rxl.asignarDocente
    pass
    
except Exception as e:
    print('Error: '+str(e))
