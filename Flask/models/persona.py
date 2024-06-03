class Persona:
    def __init__(self):
        self.__id = 0
        self.__nombre = ""
        self.__apellido = ""
        self.__cedula = ""
        self.__isActivo = True
        self.__rolId = 0
        self.__cuentaId = 0


    @property
    def _isActivo(self):
        return self.__isActivo

    @_isActivo.setter
    def _isActivo(self, value):
        self.__isActivo = value

    @property
    def _cuentaId(self):
        return self.__cuentaId

    @_cuentaId.setter
    def _cuentaId(self, value):
        self.__cuentaId = value


    @property
    def _rolId(self):
    
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
        
        

        