from models.periodoAcademico import PeriodoAcademico
from controls.dao.daoAdapter import DaoAdapter
class PeriodoAcademicoDaoControl(DaoAdapter):
    def __init__(self):
        super().__init__(PeriodoAcademico)
        self.__periodoAcademico = None


    @property
    def _periodoAcademico(self):
        if self.__periodoAcademico is None:
            self.__periodoAcademico = PeriodoAcademico()
        return self.__periodoAcademico

    @_periodoAcademico.setter
    def _periodoAcademico(self, value):
        self.__periodoAcademico = value
        
    
    @property
    def _lista(self):
        return self._list()
        
    @property    
    def save(self):
        self.__periodoAcademico._id = self._lista._length + 1
        print("Guardando PeriodoAcademico")
        self._save(self.__periodoAcademico)
    
    def delete(self, pos):
        self._delete(pos)  
        
    def merge(self, pos):
        self._merge(self.__periodoAcademico,pos)
