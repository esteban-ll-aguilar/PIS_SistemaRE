import sys
sys.path.append('../')
from controls.funtions.exelDocenteAsignate import ExelDocentes


try:
    """ mcd._materia._nombre = "Matematicas"
    mcd.save """
    
    rxl = ExelDocentes(file_path=r"C:\Users\esteb\OneDrive\Escritorio\Estudios_Esteban\3-Ciclo\PIS\Docentes_AbrilAgosto2024.xlsx")
    rxl.saveExel
    
    rxl.asignarDocente
    
    
    
except Exception as e:
    print(e)

