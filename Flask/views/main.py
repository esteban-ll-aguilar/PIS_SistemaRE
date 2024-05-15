import sys
sys.path.append('../')
from controls.tda.linked.linkedList import Linked_List
from controls.materiaDaoControl import MateriaDaoControl
lista = Linked_List()
mcd = MateriaDaoControl()

try:
    mcd._materia._nombre = "Matematicas"
    mcd.save
    
    
except Exception as e:
    print(e)

