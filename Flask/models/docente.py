from models.usuario import Usuario

class Docente(Usuario): 
    def __init__(self):
        super().__init__()
        self.__id = 0
        self.__cubiculo = ''
        self.__experiencia = ''
        
        
    @property
    def _id(self):
        return self.__id

    @_id.setter
    def _id(self, value):
        self.__id = value

    @property
    def _experiencia(self):
        return self.__experiencia

    @_experiencia.setter
    def _experiencia(self, value):
        self.__experiencia = value


    @property
    def _cubiculo(self):
        return self.__cubiculo

    @_cubiculo.setter
    def _cubiculo(self, value):
        self.__cubiculo = value


    @property
    def serializable(self):
        return {
            "iddocente": self._id,
            "user_cedula": self._cedula,
            "cubiculo": self._cubiculo,
            "experiencia": self._experiencia,
        }

    def deserialize(self, data):
        docente = Docente()
        docente._id = data['iddocente']
        docente._cedula = data['user_cedula']
        docente._cubiculo = data['cubiculo']
        docente._experiencia = data['experiencia']
        return docente

        
        
    