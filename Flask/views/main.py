import sys
sys.path.append('../')
<<<<<<< HEAD
from controls.materiaDaoControl import MateriaDaoControl
from funtions.readDocentesExel import ReadDocentesExel
from funtions.exelDao import ExelDao
from controls.cursaDaoControl import CursaDaoControl
#mcd = MateriaDaoControl()
#rd = ReadDocentesExel()
ed = ExelDao()
=======
from controls.funtions.exelDocenteAsignate import ExelDocentes


>>>>>>> Esteban_Leon
try:
    """ mcd._materia._nombre = "Matematicas"
    mcd.save """
    
<<<<<<< HEAD
    rxl = ReadDocentesExel()
    #print(rxl.filterCiclo(12))
   

    #print(rd.filterCiclo(12))
    
    ed.asignarDocentes
=======
    rxl = ExelDocentes(file_path=r"C:\Users\esteb\OneDrive\Escritorio\Estudios_Esteban\3-Ciclo\PIS\Docentes_AbrilAgosto2024.xlsx")
    rxl.saveExel
    
    rxl.asignarDocente
>>>>>>> Esteban_Leon
    
    
    
except Exception as e:
    print(e)

