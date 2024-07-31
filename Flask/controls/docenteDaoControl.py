from models.docente import Docente
from controls.dao.daoAdapter import DaoAdapter
from controls.db.crud.crudDocente import CrudDocente
class DocenteDaoControl(DaoAdapter):
    def __init__(self):
        super().__init__(Docente)
        self.__docente = None
        self.__crud = CrudDocente()

    @property
    def _docente(self):
        if self.__docente is None:
            self.__docente = Docente()
        return self.__docente
    
    @_docente.setter
    def _docente(self, value):
        self.__docente = value

    @property
    def _lista(self):
        return self._list()
    
    @property
    def save(self):
        self.__docente._id = self._lista._length + 1
        self._lista._length =  self._lista._length + 1
        self.__crud.createDocente(self.__docente._id, self.__docente._cedula, 
                                     self.__docente._cubiculo, self.__docente._experiencia)
        
    def delete(self):
        self.__crud.deleteDocente(self.__docente._id, self.__docente._cedula, 
                                     self.__docente._cubiculo, self.__docente._experiencia)
        
    def merge(self):
        self.__crud.updateDocente(self.__docente._id, self.__docente._cedula, 
                                     self.__docente._cubiculo, self.__docente._experiencia)