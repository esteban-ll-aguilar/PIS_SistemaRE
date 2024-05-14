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

    