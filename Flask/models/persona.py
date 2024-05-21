class Persona:
    def __init__(self):
        self.__id = 0
        self.__nombre = ""
        self.__apellido = ""
        self.__cedula = ""
        self.__rolId = 0
        self.__cuentaId = 0
        self.__isActivo = True


    @property
    def _isActivo(self):
        return self.__isActivo

    @_isActivo.setter
    def _isActivo(self, value):
        self.__isActivo = value

    @property
    def _cuentaId(self):
        """ if self.__cuentaId is None:
            from models.cuenta import Cuenta
            self.__cuentaId = Cuenta() """
        return self.__cuentaId

    @_cuentaId.setter
    def _cuenta(self, value):
        self.__cuentaId = value


    @property
    def _rolId(self):
        """ if self.__rolId is None:
            from models.rol import Rol
            self.__rolId = Rol() """
        return self.__rolId

    @_rolId.setter
    def _rolId(self, value):
        self.__rolId = value


    @property
    def _id(self):
        return self.__id

    @_id.setter
    def _id(self, value):
        self.__id = value

    @property
    def _nombre(self):
        return self.__nombre

    @_nombre.setter
    def _nombre(self, value):
        self.__nombre = value

    @property
    def _apellido(self):
        return self.__apellido

    @_apellido.setter
    def _apellido(self, value):
        self.__apellido = value

    @property
    def _cedula(self):
        return self.__cedula

    @_cedula.setter
    def _cedula(self, value):
        self.__cedula = value
        
        
    @property
    def serializable(self):
        return {
            "id": self._id,
            "nombre": self._nombre,
            "apellido": self._apellido,
            "cedula": self._cedula,
            "rol": self._rolId,
            "cuenta": self.__cuentaId,
            "isActivo": self._isActivo
        }
    def deserialize(self, data):
        persona = Persona()
        persona._id = data["id"]
        persona._nombre = data["nombre"]
        persona._apellido = data["apellido"]
        persona._cedula = data["cedula"]
        persona._rolId = data["rol"]
        persona._cuentaId = data["cuenta"]
        persona._isActivo = data["isActivo"]
        return persona
    
    

        