from models.calificacion import Calificacion
from controls.dao.daoAdapter import DaoAdapter
from controls.db.crud.crudCalificacion import CrudCalificacion
class CalificacionDaoControl(DaoAdapter):
    def __init__(self):
        super().__init__(Calificacion)
        self.__calificacion = None
        self.__crud = CrudCalificacion()
        
    @property
    def _calificacion(self):
        if self.__calificacion is None:
            self.__calificacion = Calificacion()
        return self.__calificacion
    
    @_calificacion.setter
    def _calificacion(self, value):
        self.__calificacion = value
        
    
    @property
    def _lista(self):
        return self._list()
    
    @property
    def save(self):
        # self.__calificacion._id = self._lista._length + 1
        # print("Guardando Calificacion")
        # self._save(self.__calificacion)
        try:
            self.__crud.createCalificacion(self.__calificacion._id,
                                           self.__calificacion._valor,
                                           self.__calificacion._rubricaCalificacionId,
                                           self.__calificacion._unidadId,
                                           self.__calificacion._cursaId)
        except Exception as e:
            print('Error: '+str(e))
            
        
    @property
    def delete(self):
        self.__crud.deleteCalificacion(self.__calificacion._id,
                                        self.__calificacion._valor,
                                        self.__calificacion._rubricaCalificacionId,
                                        self.__calificacion._unidadId,
                                        self.__calificacion._cursaId)
        
        
    def merge(self):
        self.__crud.updateCalificacion(self.__calificacion._id,
                                        self.__calificacion._valor,
                                        self.__calificacion._rubricaCalificacionId,
                                        self.__calificacion._unidadId,
                                        self.__calificacion._cursaId)
    