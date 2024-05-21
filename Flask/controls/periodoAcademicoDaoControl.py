from models.periodoAcademico import PeridoAcademico
from controls.dao.daoAdapter import DaoAdapter
class PeriodoAcademicoDaoControl(DaoAdapter):
    def __init__(self):
        super().__init__(PeridoAcademico)
        self.__periodoAcademico = None


    @property
    def _periodoAcademico(self):
        if self.__periodoAcademico is None:
            self.__periodoAcademico = PeridoAcademico()
        return self.__periodoAcademico

    @_periodoAcademico.setter
    def _periodoAcademico(self, value):
        self.__periodoAcademico = value
        
    
        @property
        def _lista(self):
            return self._list()
        
        def save(self):
            self.__periodoAcademico._id = self._lista._length + 1
            print("Guardando PeriodoAcademico")
            self._save(self.__periodoAcademico)