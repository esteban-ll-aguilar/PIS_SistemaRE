from Flask.models.usuario import Persona

class Docente(Persona): 
    def __init__(self):
        super().__init__()
        self.__cubiculo = ''

    @property
    def _cubiculo(self):
        return self.__cubiculo

    @_cubiculo.setter
    def _cubiculo(self, value):
        self.__cubiculo = value


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
            "cubiculo": self._cubiculo
        }
    
    def deserialize(self, data):
        docente = Docente()
        docente._id = data['id']
        docente._nombre = data['nombre']
        docente._apellido = data['apellido']
        docente._cedula = data['cedula']
        docente._isActivo = data['isActivo']
        docente._rolId = data['rolId']
        docente._cuentaId = data['cuentaId']
        docente._cubiculo = data['cubiculo']
        return docente
        
        
    