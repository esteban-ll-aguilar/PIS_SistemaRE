from controls.dao.daoAdapter import DaoAdapter
from Flask.models.rubricaCalificacion import RubriaCaCF
class RubricaCalificacionDaoControl(DaoAdapter):
    def __init__(self):
        super().__init__(RubriaCaCF)
        self.__rubricaCalificacion = None


    @property
    def _rubricaCalificacion(self):
        if self.__rubricaCalificacion is None:
            self.__rubricaCalificacion = RubriaCaCF()
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
        
    def merge(self, pos):
        self._merge(self.__rubricaCalificacion,pos)