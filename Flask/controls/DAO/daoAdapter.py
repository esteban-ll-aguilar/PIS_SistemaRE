from typing import TypeVar, Generic, Type
from controls.tda.linked.linkedList import Linked_List
from config.DBConfig import DBConnection
import os, json
T = TypeVar("T")

class DaoAdapter(Generic[T]):
    atype: T
    def __init__(self, atype: T):
        self.atype = atype
        self.lista = Linked_List()
        
    
    
    def _list(self) -> T:
        
        
        return self.lista
    
    
    def __transform__(self):
        aux = '['
        for i in range(0, self.lista._length):
            if i < self.lista._length -1:
                aux += str(json.dumps(self.lista.get(i).serializable)) + ','
            else:
                aux += str(json.dumps(self.lista.get(i).serializable))
        aux += ']'
        return aux
                
    def to_dict(self):
        aux = []
        self._list()
        for i in range(0, self.lista._length):
            aux.append(self.lista.get(i).serializable)
        return aux

    def _save(self, data: T) -> T:
        self._list()
        self.lista.add(data, self.lista._length)
        f = open(self.URL + self.file, "w")
        print("Nombre del archivo: "+self.file)
        f.write(self.__transform__())
        f.close()

    def _merge(self, data: T, pos) -> T:
        print("Guardando")
        self._list()
        self.lista.edit(data, pos)
        f = open(self.URL + self.file, "w")
        print("Nombre del archivo: "+self.file)
        f.write(self.__transform__())
        f.close()