from Flask.models.persona import Persona
class Docente(Persona): # Hereda de Persona
    def __init__(self):
        super().__init__(d=0,nombre="",apellido="",cedula="",rol=None)  # Llama al constructor de la clase base (Persona)
    
    def __str__(self):
        return f"Docente: {self.nombre} {self.apellido}"
