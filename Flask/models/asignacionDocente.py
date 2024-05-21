class AsignacionDocente:
    def __init__(self) -> None:
        self.__id = ''
        self.__docente = None
        self.__materia = None

    @property
    def _id(self):
        return self.__id

    @_id.setter
    def _id(self, value):
        self.__id = value

    @property
    def _docente(self):
        if self.__docente is None:
            from models.docente import Docente
            self.__docente = Docente()
        return self.__docente

    @_docente.setter
    def _docente(self, value):
        self.__docente = value

    @property
    def _materia(self):
        if self.__materia is None:
            from models.materia import Materia
            self.__materia = Materia()
        return self.__materia

    @_materia.setter
    def _materia(self, value):
        self.__materia = value
        
    @property
    def serializable(self):
        return {
            'id': self._id,
            'docente': self._docente.serializable,
            'materia': self._materia.serializable
        }
    
    def deserialize(self, data):
        docente = AsignacionDocente()
        docente._id = data['id']
        docente._docente = self._docente.deserialize(data['docente'])
        docente._materia = self._materia.deserialize(data['materia'])
        return docente
    
