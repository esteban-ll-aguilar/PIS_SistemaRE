class Persona:
    def __init__(self):
        self.__id = 0
        self.__nombre = ""
        self.__apellido = ""
        self.__cedula = ""
        self.__rol = None

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
            "id": self.__id,
            "nombre": self.__nombre,
            "apellido": self.__apellido,
            "cedula": self.__cedula,
            "rol": self.__rol
        }
    def deserialize(self, data):
        persona = Persona()
        persona._id = data["id"]
        persona._nombre = data["nombre"]
        persona._apellido = data["apellido"]
        persona._cedula = data["cedula"]
        persona._rol = data["rol"]
        return persona
    
    

        