from models.persona import Persona

class Administrador(Persona):
    def __init__(self):
        super().__init__()
 
    
    def __str__(self):
        return f"{self.nombre} {self.apellido} {self.edad} {self.dni} {self.telefono} {self.email} {self.direccion} {self.fecha_nacimiento} {self.genero}"