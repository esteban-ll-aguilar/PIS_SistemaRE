import sys
sys.path.append('../')
from controls.materiaDaoControl import MateriaDaoControl
from funtions.readDocentesExel import ReadDocentesExel
from funtions.exelDao import ExelDao
#mcd = MateriaDaoControl()
#rd = ReadDocentesExel()
ed = ExelDao()
try:
    """ mcd._materia._nombre = "Matematicas"
    mcd.save """
    
    rxl = ReadDocentesExel()
    #print(rxl.filterCiclo(12))
    
    #print(rd.filterCiclo(12))
    
    ed.asignarDocentes
    
    
    
except Exception as e:
    print(e)

