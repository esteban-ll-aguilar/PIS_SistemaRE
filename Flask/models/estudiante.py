from Flask.models.persona import Persona
class Estudiante(Persona): # Hereda de Persona
    def __init__(self, id_estudiante, nombre, apellido, cedula, rol):
        super().__init__()  # Llama al constructor de la clase base (Persona)
        self.id = id_estudiante  # Atributo específico de Estudiante
        self.nombre = nombre
        self.apellido = apellido
        self.cedula = cedula
        self.rol = rol

    def __str__(self):
        return f"Estudiante: {self.nombre} {self.apellido}"