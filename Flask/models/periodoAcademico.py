class PeridoAcademico:
    def __init__(self):
<<<<<<< HEAD
        self.__id = id
        self.__nombre = ''
=======
        self.__id = 0
        self.__nombrePeriodoAcademico = ''

    @property
    def _nombrePeriodoAcademico(self):
        return self.__nombrePeriodoAcademico

    @_nombrePeriodoAcademico.setter
    def _nombrePeriodoAcademico(self, value):
        self.__nombrePeriodoAcademico = value

>>>>>>> main

    @property
    def _id(self):
        return self.__id

    @_id.setter
    def _id(self, value):
        self.__id = value

<<<<<<< HEAD
    @property
    def _nombre(self):
        return self.__nombre

    @_nombre.setter
    def _nombre(self, value):
        self.__nombre = value
        
    @property
    def serialize(self):
        return {
            "id": self._id,
            "nombre": self._nombre
=======
        
    @property
    def serializable(self):
        return {
            "id": self._id,
            "nombrePeriodoAcademico": self._nombrePeriodoAcademico
>>>>>>> main
        }
        
    def deserialize(self, data):
        periodoAcademico = PeridoAcademico()
        periodoAcademico._id = data['id']
<<<<<<< HEAD
        periodoAcademico._nombre = data['nombre']
=======
        periodoAcademico._nombrePeriodoAcademico = data['nombrePeriodoAcademico']
>>>>>>> main
        return periodoAcademico

        