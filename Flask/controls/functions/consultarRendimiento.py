from functions.readNotasExel import ReadNotasExel


class ConsultarRendimientoAcademico:
    def __init__(self, archivo=r'C:\Users\esteb\OneDrive\Escritorio\Estudios_Esteban\3-Ciclo\PIS\Formato_Notas_SRE.xlsx', unidad=1):
        self.__readNotasExel = ReadNotasExel(archivo, unidad)

    def consultarRendimiento(self, cedula):
        data = self.__readNotasExel.readExel
        data = data[data['Cedula'] == cedula]
        return data

    def __str__(self) -> str:   
        pass