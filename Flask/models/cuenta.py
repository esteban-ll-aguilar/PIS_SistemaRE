class Cuenta:
    def __init__(self):
        self.id = 0
        self.clave = ""
        self.estado = bool
        self.correo = ""
        
    @property
    def _id(self):
        return self.id
    
    @_id.setter
    def _id(self, value):
        self.id = value
    
    @property
    def _clave(self):
        return self.clave
    
    @_clave.setter
    def _clave(self, value):
        self.clave = value
    
    @property
    def _estado(self):
        return self.estado

    @_estado.setter
    def _estado(self, value):
        self.estado = value
    
    @property
    def _correo(self):
        return self.correo
    
    @_correo.setter
    def _correo(self, value):
        self.correo = value
        
    @property
    def serializable(self):
        return {
            "id": self.id,
            "clave": self.clave,
            "estado": self.estado,
            "correo": self.correo
        }
    
    def deserialize(self, data):
        cuenta = Cuenta()
        cuenta._id = data["id"]
        cuenta._clave = data["clave"]
        cuenta._estado = data["estado"]
        cuenta._correo = data["correo"]
        return cuenta

    