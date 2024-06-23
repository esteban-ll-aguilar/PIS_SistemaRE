from controls.dao.daoAdapter import DaoAdapter
from models.rubricaCalificacion import RubricaCF
class RubricaCalificacionDaoControl(DaoAdapter):
    def __init__(self):
        super().__init__(RubricaCF)
        self.__rubricaCalificacion = None


    @property
    def _rubricaCalificacion(self):
        if self.__rubricaCalificacion is None:
            self.__rubricaCalificacion = RubricaCF()
        return self.__rubricaCalificacion

    @_rubricaCalificacion.setter
    def _rubricaCalificacion(self, value):
        self.__rubricaCalificacion = value
        
    @property
    def _lista(self):
        return self._list()
    
    @property
    def save(self):
        self.__rubricaCalificacion._id = self._lista._length + 1
        print("Guardando RubricaCalificacion")
        self._save(self.__rubricaCalificacion)
        
    def delete(self, pos):
        self._delete(pos)  
        
    def merge(self, pos):
        self._merge(self.__rubricaCalificacion,pos)