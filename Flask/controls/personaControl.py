class PersonaControl:
    def __init__(self):
        self.__persona = None

    def getPersona(self):
        if self.__persona is None:
            from models.persona import Persona
            self.__persona = Persona()
        return self.__persona

    def setPersona(self, value):
        self.__persona = value