from controls.dao.daoAdapter import DaoAdapter
from models.cursa import Cursa
from controls.db.crud.crudCursa import CrudCursa
class CursaDaoControl(DaoAdapter):
    def __init__(self):
        super().__init__(Cursa)
        self.__cursa = None
        self.__crud = CrudCursa()
    @property
    def _cursa(self):
        if self.__cursa is None:
            self.__cursa = Cursa()
        return self.__cursa
    
    @_cursa.setter
    def _cursa(self, value):
        self.__cursa = value
        
    
    @property
    def _lista(self):
        return self._list()
    
    @property
    def save(self):
        # print("Guardando Cursa")
        # self._save(self.__cursa)
        self.__crud.createCursa(self.__cursa._estudianteCedula, 
                          self.__cursa._materiaId, self.__cursa._paralelo, 
                          self.__cursa._docenteCedula, self.__cursa._periodoAcademicoId)
    def delete(self):
        self.__crud.deleteCursa(self._cursa._id, self.__cursa._estudianteCedula, 
                          self.__cursa._materiaId, self.__cursa._paralelo, 
                          self.__cursa._docenteCedula, self.__cursa._periodoAcademicoId)
    
    def merge(self):
        self._merge(self.__cursa)