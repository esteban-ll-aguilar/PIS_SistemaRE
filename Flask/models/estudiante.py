from models.usuario import Usuario

class Estudiante(Usuario):
    def __init__(self):
        super().__init__()
        self.__id = 0
        self.__becaEconomica = "NULL"
        self.__fechaNacimiento = "" 

    @property
    def _id(self):
        return self.__id

    @_id.setter
    def _id(self, value):
        self.__id = value

    @property
    def _becaEconomica(self):
        return self.__becaEconomica

    @_becaEconomica.setter
    def _becaEconomica(self, value):
        self.__becaEconomica = value

    @property
    def _fechaNacimiento(self):
        return self.__fechaNacimiento

    @_fechaNacimiento.setter
    def _fechaNacimiento(self, value):
        self.__fechaNacimiento = value
       
    
    @property
    def serializable(self):
        return {
            "idestudiante": self._id,
            "user_cedula": self._cedula,
            "beca_economica": self._becaEconomica,
            "fecha_nacimiento": self._fechaNacimiento,
        }

    def deserialize(self, data):
        estudiante = Estudiante()
        estudiante._id = data['idestudiante']
        estudiante._cedula = data['user_cedula']
        estudiante._becaEconomica = data['beca_economica']
        estudiante._fechaNacimiento = data['fecha_nacimiento']
        return estudiante

        