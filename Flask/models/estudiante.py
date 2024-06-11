from models.usuario import Usuario

class Estudiante(Usuario):
    def __init__(self):
        super().__init__()
        
    
    @property
    def serializable(self):
        return {
            "user_IdUser": self._id,
            "user_Cedula": self._cedula,
            'user_Nombres': self._nombres,
            'user_Apellidos': self._apellidos,
            'user_Correo': self._correo,
            'user_Contrasena': self._contrasena,
            'user_Estado': self._estado,
            'user_UrlImagen': self._urlImagen,
            'user_NombreUser': self._nombreUsuario
            
        }

    def deserialize(self, data):
        estudiante = Estudiante()
        estudiante._id = data['user_IdUser']
        estudiante._cedula = data['user_Cedula']
        estudiante._nombres = data['user_Nombres']
        estudiante._apellidos = data['user_Apellidos']
        estudiante._correo = data['user_Correo']
        estudiante._contrasena = data['user_Contrasena']
        estudiante._estado = data['user_Estado']
        estudiante._urlImagen = data['user_UrlImagen']
        estudiante._nombreUsuario = data['user_NombreUser']
        
        return estudiante

        