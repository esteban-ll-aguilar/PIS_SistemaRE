from controls.exception.exelException import FileNoExisteException
import json, os
import pandas as pd
import numpy as np
import enum
from typing import Type, TypeVar, Generic
from controls.tda.linked.linkedList import Linked_List
T = TypeVar("T")
class ExelDaoAdapter(Generic[T]):
    atype: T
    def __init__(self, atype: T, archivo):
        self.archivo = archivo
        self.atype = atype
        self.file = atype.__name__.lower() + ".json"
        self.URL = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))) + "/data/"
        print(self.URL)

    
    
    
    

    @property   
    def _saveExel(self):
        self.__dF = pd.read_excel(self.archivo)#usecols=lambda x:x != 'Estudiante')
        self.__dF['Cedula'] = self.__dF['Cedula'].astype(str)
        json = self.__dF.to_json(orient='records')
        f = open(self.URL + self.file, "w")
        f.write(json)
        f.close()
            
        return 'Archivo guardado'
    
    @property
    def _readExel(self):
        try:
            f = open(self.URL + self.file, "r")
            data = json.load(f)
            f.close()
            return data
        except FileNotFoundError as e:
            print(e)
            raise FileNoExisteException("No existe el archivo")
        
    
    
        
    
        
        

    

        
    