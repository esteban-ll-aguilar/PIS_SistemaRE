import pandas as pd
import numpy as np
import enum
from controls.exception.exelException import CicloNoExisteException
class ReadNotasExel():
    def __init__(self, file=r'C:\Users\esteb\OneDrive\Escritorio\Estudios_Esteban\3-Ciclo\PIS\Formato_Notas_SRE.xlsx', unidad=1):
        self.__archivo = file
        if unidad < 1:
            raise CicloNoExisteException('No existe esa unidad')
        self.__unidad = unidad - 1
        self.__dF = None

    @property
    def readExel(self):
        try:
            self.__dF = pd.read_excel(self.__archivo, sheet_name=self.__unidad, usecols=lambda x:x not in ['Estudiante', 'Prom'], engine='openpyxl')
            self.__dF['Cedula'] = self.__dF['Cedula'].astype(str)
            print(self.__dF)
            dict = self.__dF.to_dict('records')
            #print(dict)
            
        except Exception as e:
            print(f"Error al leer el archivo Excel: {e}")
    
