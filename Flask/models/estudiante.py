from models.usuario import Usuario

class Estudiante(Usuario):
    def __init__(self):
        super().__init__()
        
    
    @property
    def serializable(self):
        return {
            "user_iduser": self._id,
            "user_cedula": self._cedula,
            'user_nombres': self._nombres,
            'user_apellidos': self._apellidos,
            'user_correo': self._correo,
            'user_contrasena': self._contrasena,
            'user_estado': self._estado,
            'user_urlimage': self._urlImagen,
            'user_nombreuser': self._nombreUsuario
        }

    def deserialize(self, data):
        estudiante = Estudiante()
        estudiante._id = data['user_iduser']
        estudiante._cedula = data['user_cedula']
        estudiante._nombres = data['user_nombres']
        estudiante._apellidos = data['user_apellidos']
        estudiante._correo = data['user_correo']
        estudiante._contrasena = data['user_contrasena']
        estudiante._estado = data['user_estado']
        estudiante._urlImagen = data['user_urlimage']
        estudiante._nombreUsuario = data['user_nombreuser']
        
        return estudiante

        