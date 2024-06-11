from Flask.models.usuario import Persona

class Estudiante(Persona):
    def __init__(self):
        super().__init__()
        self.__matricula = ''

    @property
    def _matricula(self):
        return self.__matricula

    @_matricula.setter
    def _matricula(self, value):
        self.__matricula = value
        
    @property
    def serializable(self):
        return {
            "id": self._id,
            "nombre": self._nombre,
            "apellido": self._apellido,
            "cedula": self._cedula,
            "isActivo": self._isActivo,
            "rolId": self._rolId,
            "cuentaId": self._cuentaId,
            "matricula": self._matricula
        }

    def deserialize(self, data):
        estudiante = Estudiante()
        estudiante._id = data['id']
        estudiante._nombre = data['nombre']
        estudiante._apellido = data['apellido']
        estudiante._cedula = data['cedula']
        estudiante._isActivo = data['isActivo']
        estudiante._rolId = data['rolId']
        estudiante._cuentaId = data['cuentaId']
        estudiante._matricula = data['matricula']
        return estudiante

        