import openpyxl
from openpyxl.chart import BarChart, Reference
from functions.readNotasExel import ReadNotasExel

class GenerarInforme:
    def __init__(self, archivo=r'C:\Users\esteb\OneDrive\Escritorio\Estudios_Esteban\3-Ciclo\PIS\Formato_Notas_SRE.xlsx', unidad=1):
        self.__readNotasExel = ReadNotasExel(archivo, unidad)

    
