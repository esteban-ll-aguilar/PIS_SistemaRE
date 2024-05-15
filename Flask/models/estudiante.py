from Flask.models.persona import Persona


class Estudiante(Persona): # Hereda de Persona
    def __init__(self):
        super().__init__(Persona)  # Llama al constructor de la clase base (Persona)
 
 
    def __str__(self):
        return f"Estudiante:"