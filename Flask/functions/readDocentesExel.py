from controls.exception.exelException import CicloNoExisteException
import pandas as pd
import numpy as np
import enum
class ReadDocentesExel:
    def __init__(self, archivo=r"C:\Users\esteb\OneDrive\Escritorio\Estudios_Esteban\3-Ciclo\PIS\Docentes_AbrilAgosto2024.xlsx") -> None:
        self.__archivo = archivo
    

    @property
    def readExel(self):
        self.__dF = pd.read_excel(self.__archivo)#usecols=lambda x:x != 'Estudiante')
        self.__dF['Cedula'] = self.__dF['Cedula'].astype(str)
        #self.__dF['Ciclo'] = self.__dF['Ciclo'].astype(int)
        return self.__dF

    
    def filterCiclo(self,ciclo):
        #si no existe el ciclo
        if ciclo not in self.readExel['Ciclo'].values:
            return CicloNoExisteException("El ciclo no existe en el archivo")
        return self.readExel.loc[self.readExel['Ciclo'] == ciclo]
        
        
    def toArray(self, ciclo):
        return self.filterCiclo(ciclo).values
    def __str__(self) -> str:
        pass    