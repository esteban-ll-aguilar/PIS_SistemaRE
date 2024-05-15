from Flask.models.persona import Persona
class Docente(Persona): # Hereda de Persona
    def __init__(self, id_docente, nombre, apellido, cedula, rol):
        super().__init__()  # Llama al constructor de la clase base (Persona)
        self.id = id_docente  # Atributo específico de Docente
        self.nombre = nombre
        self.apellido = apellido
        self.cedula = cedula
        self.rol = rol

    def __str__(self):
        return f"Docente: {self.nombre} {self.apellido}"
