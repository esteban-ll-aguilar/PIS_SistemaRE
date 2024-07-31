from models.estudiante import Estudiante
from controls.dao.daoAdapter import DaoAdapter
from controls.db.crud.crudEstudiante import CrudEstudiante
class EstudianteDaoControl(DaoAdapter):
    def __init__(self):
        super().__init__(Estudiante)
        self.__estudiante = None
        self.__crud = CrudEstudiante()
    @property
    def _estudiante(self):
        if self.__estudiante is None:
            self.__estudiante = Estudiante()
        return self.__estudiante
    
    @_estudiante.setter
    def _estudiante(self, value):
        self.__estudiante = value

    @property
    def _lista(self):
        return self._list()
    
    @property
    def save(self):
        # self.__estudiante._id = self._lista._length + 1
        # self._save(self.__estudiante)
        self.__estudiante._id = self._lista._length + 1
        self._lista._length =  self._lista._length + 1
        self.__crud.createEstudiante(self.__estudiante._id, self.__estudiante._cedula, 
                                     self.__estudiante._becaEconomica, self.__estudiante._fechaNacimiento)
        
    
    def delete(self):
        self.__crud.deleteEstudiante(self.__estudiante._id, self.__estudiante._cedula, 
                                     self.__estudiante._becaEconomica, self.__estudiante._fechaNacimiento)  
        
    def merge(self):
        self.__crud.updateEstudiante(self.__estudiante._id, self.__estudiante._cedula, 
                                     self.__estudiante._becaEconomica, self.__estudiante._fechaNacimiento)