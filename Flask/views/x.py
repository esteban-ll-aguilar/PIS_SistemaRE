import pandas as pd

# Leer el archivo de Excel
df = pd.read_excel(r"C:\Users\esteb\OneDrive\Escritorio\Estudios_Esteban\3-Ciclo\PIS\Estudiantes_AbrilAgosto2024.xlsx")

# Contar la frecuencia de cada nombre
frecuencia_correo = df['Correo'].value_counts()
frecuencia_nombre = df['Nombre'].value_counts()


# Guardar el resultado en un nuevo archivo de Excel
with pd.ExcelWriter('frecuencia.xlsx') as writer:
    frecuencia_correo.to_excel(writer, sheet_name='Frecuencia Correo')
    frecuencia_nombre.to_excel(writer, sheet_name='Frecuencia Nombre')
print(frecuencia_correo)
print(frecuencia_nombre)


