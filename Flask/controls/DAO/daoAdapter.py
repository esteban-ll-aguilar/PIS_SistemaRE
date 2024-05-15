from controls.TDA.linkedList import LinkedList
from typing import TypeVar, Generic
import json
import os

T = TypeVar('T')
class DaoAdapter(Generic[T]):
    atype = T
    def __init__(self, atype: T):
        self.atype = atype
        self.lista = LinkedList()
        self.file = atype.__name__.lower() + ".json"
        self.URL = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) + "/data/" 

    def list(self) -> T:
        if os.path.isfile(self.URL + self.file):
            f = open(self.URL + self.file, "r")
            datos = json.load(f)
            self.lista.clear
            for data in datos:
                print(type(data))
                a = self.atype.deserializar(data)
                self.lista.add(a, self.lista._length)
            f.close()
        return self.lista

    def __transform__(self):
        aux = "["
        for i in range(self.lista._length):
            if i < self.lista._length - 1:
                aux += str (json.dumps(self.lista.get(i).serializable)) + ","
            else:
                aux += str(json.dumps(self.lista.get(i).serializable))
        aux += "]"
        return aux
    
    def _save(self, data:T):
        self._list()
        self.lista.addAt(data, self.lista._length)
        a = open(self.URL + self.file, "w")
        a.write(self.__transform__())
        a.close()
    
