from controls.DAO.daoAdapter import DaoAdapter
from models.materia import Materia

class MateriaDaoControl(DaoAdapter):
    def __init__(self):
        super().__init__(Materia)
        self.__materia = None

    @property
    def _materia(self):
        if self.__materia is None:
            self.__materia = Materia()
        return self.__materia
    
    @_materia.setter
    def _materia(self, value):
        self.__materia = value
    
    @property
    def _lista(self):
        return self._list()
    
    @property
    def save(self):
        self._materia._id = self._lista._length + 1
        self._save(self._materia)
        