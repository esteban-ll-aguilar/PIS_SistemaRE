from models.persona import Persona
from controls.DAO.daoAdapter import DaoAdapter

class PersonaDaoControl(DaoAdapter):
    def __init__(self):
        super().__init__(Persona)
        self.__persona = None
        self.__rol = None
        self.__cuenta = None

    @property
    def _persona(self):
        if self.__persona is None:
            self.__persona = Persona()
        return self.__persona

    @_persona.setter
    def _persona(self, value):
        self.__persona = value

    @property
    def _rol(self):
        if self.__rol is None:
            from models.rol import Rol
            self.__rol = Rol()
        return self.__rol

    @_rol.setter
    def _rol(self, value):
        self.__rol = value

    @property
    def _cuenta(self):
        if self.__cuenta is None:
            from models.cuenta import Cuenta
            self.__cuenta = Cuenta()
        return self.__cuenta

    @_cuenta.setter
    def _cuenta(self, value):
        self.__cuenta = value
        
        
    @property
    def _lista(self):
        return self._list()
    
    @property
    def save(self):
        self.__persona._id = self._lista._length + 1
        print("Guardando Persona")
        self._save(self.__persona)
        
    
        

        
    