<<<<<<< HEAD
from controls.dao.daoAdapter import DaoAdapter
=======
from controls.exception.arrayPositionException import ArrayPositionException
from controls.exception.linkedListExeption import LinkedEmptyException, ArrayPositionException
from controls.DAO.daoAdapter import DaoAdapter
>>>>>>> main
from models.cursa import Cursa

class CursaDaoControl(DaoAdapter):
    def __init__(self):
        super().__init__(Cursa)
        self.__cursa = None
<<<<<<< HEAD
        
=======

>>>>>>> main
    @property
    def _cursa(self):
        if self.__cursa is None:
            self.__cursa = Cursa()
        return self.__cursa
    
    @_cursa.setter
    def _cursa(self, value):
        self.__cursa = value
        
<<<<<<< HEAD
=======
    
>>>>>>> main
    @property
    def _lista(self):
        return self._list()
    
    @property
    def save(self):
        self.__cursa._id = self._lista._length + 1
        print("Guardando Cursa")
        self._save(self.__cursa)