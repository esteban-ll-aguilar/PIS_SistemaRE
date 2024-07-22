import pandas as pd

class ExelFormat():

    def validate_excel_file(self,file_path):
        try:
            # Leer el archivo Excel
            df = pd.read_excel(file_path, engine='openpyxl')

            errors = []

            # Verificar si el DataFrame está vacío
            if df.empty:
                errors.append('El archivo está vacío.')
                return False
            else:
                # Verificar datos faltantes entre columnas
                for i, row in df.iterrows():
                    # Si hay valores NaN en una fila y hay menos valores que en la primera fila, consideramos que hay datos faltantes
                    if row.isnull().any() and len(row) < len(df.columns):
                        errors.append(f'Fila {i + 1} tiene datos faltantes.')
                        return False

            return True

        except Exception as e:
            return False
        
    def validate_columns_student(self,file_path):
        required_columns = [
        "Nombre", "Apellido", "Correo", "Ciclo", "Paralelo", "Cedula", "Fnacimiento", "BecaEc"
        ]
        columnas = pd.read_excel(file_path, engine='openpyxl').columns
        if set(columnas) != set(required_columns):
            return False
        return True
    
    def validate_columns_docent(self,file_path):
        required_columns = [
        "Nombre", "Apellido", "Correo","Materia", "Ciclo", "Paralelo", "Cedula", "Cubiculo", "Experiencia"
        ]
        columnas = pd.read_excel(file_path, engine='openpyxl').columns
        if set(columnas) != set(required_columns):
            return False
        return True
        
    def is_valid_ecuadorian_id(self,cedula):
        """Verifica si una cédula ecuatoriana es válida."""
        try:
            # Primera regla: primer dígito debe ser entre 1 y 24
            province_code = int(cedula[:2])
            if province_code < 1 or province_code > 24:
                return False
            
            # Segunda regla: Verificación del dígito verificador
            digits = [int(d) for d in cedula]
            sum_even = sum(digits[i] * 2 for i in range(0, 8, 2))
            sum_odd = sum(digits[i] for i in range(1, 8, 2))
            check_digit = (10 - (sum_even + sum_odd) % 10) % 10
            
            return check_digit == digits[9]
        except:
            return False
        
    def validate_cedula(self,file_path):
        df = pd.read_excel(file_path, engine='openpyxl')
        for i, row in df.iterrows():
            if not self.is_valid_ecuadorian_id(str(row['Cedula'])):
                return False
        return True
    
    
    def verify_exel_format(self,file_path, isStudent=True):
        validated = self.validate_excel_file(file_path)
        if validated:
            if isStudent:
                validated = self.validate_columns_student(file_path)
            else:
                validated = self.validate_columns_docent(file_path)
        #if validated:
          #  validated = self.validate_cedula(file_path)
        return validated
    
        
    
