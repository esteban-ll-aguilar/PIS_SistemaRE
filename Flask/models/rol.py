class Rol:
    def __init__(self):
        self.__id = 0
        self.__nombre = ""
        self.__descripcion = ""

    def __str__(self):
        return self.__nombre


    @property
    def _descripcion(self):
        return self.__descripcion
        
    