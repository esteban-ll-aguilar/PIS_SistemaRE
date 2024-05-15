from controls.TDA.linkedList import LinkedList
from controls.materiaControl import MateriaControl
from controls.materiaDaoControl import MateriaDaoControl

lista = LinkedList()
mc = MateriaControl() 
mcd = MateriaDaoControl()

try:
    mc._materia._nombre = "Ingenieria de Software"
    mc._materia._ciclo = 3
    mc.save
    mc.__materia = None
    
    mcd._materia._nombre = "Ingenieria de Software"
    mcd._materia._ciclo = 3
    mcd.save
    mcd._materia = None

except Exception as e:
    print(e)

