import pandas as pd
import numpy as np
import enum
from controls.exception.exelException import CicloNoExisteException
class ReadNotasExel():
    def __init__(self, archivo=r'C:\Users\esteb\OneDrive\Escritorio\Estudios_Esteban\3-Ciclo\PIS\Formato_Notas_SRE.xlsx', unidad=1):
        self.__archivo = archivo
        if unidad == 0 or unidad > 3: return 'No existe esa unidad'
        self.__unidad = unidad -1

    @property
    def readExel(self):
        self.__dF = pd.read_excel(self.__archivo, sheet_name=self.__unidad)#usecols=lambda x:x != 'Estudiante')
        self.__dF['Cedula'] = self.__dF['Cedula'].astype(str)
        return self.__dF
    
        """ self.__dF = self.__dF.dropna()
        self.__dF = self.__dF.drop_duplicates()
        self.__dF = self.__dF.reset_index(drop=True) """
    
    def filterCiclo(self,ciclo):
        #si no existe el ciclo
        if ciclo not in self.readExel['Ciclo'].values:
            return CicloNoExisteException("El ciclo no existe en el archivo")
        return self.readExel.loc[self.readExel['Ciclo'] == ciclo]
        
        
    
    
    def __str__(self) -> str:
        pass