import openpyxl
from openpyxl.chart import BarChart, Reference
from functions.readNotasExel import ReadNotasExel

class GenerarInforme:
    def __init__(self, archivo=r'C:\Users\esteb\OneDrive\Escritorio\Estudios_Esteban\3-Ciclo\PIS\Formato_Notas_SRE.xlsx', unidad=1):
        self.__readNotasExel = ReadNotasExel(archivo, unidad)

    def generarInforme(self, ciclo):
        data = self.filterCiclo(ciclo)
        wb = openpyxl.Workbook()
        ws = wb.active
        ws.title = 'Informe'
        ws.append(['Cedula', 'Estudiante', 'Nota'])
        for index, row in data.iterrows():
            ws.append([row['Cedula'], row['Estudiante'], row['Nota']])
        chart = BarChart()
        chart.type = "col"
        chart.style = 10
        chart.title = "Notas"
        chart.y_axis.title = "Nota"
        chart.x_axis.title = "Estudiante"
        data = Reference(ws, min_col=3, min_row=1, max_row=4, max_col=3)
        cats = Reference(ws, min_col=2, min_row=2, max_row=4)
        chart.add_data(data, titles_from_data=True)
        chart.set_categories(cats)
        ws.add_chart(chart, "E1")
        wb.save("Informe.xlsx")
        return "Informe.xlsx"

