class SequentialBinarySearch:
    def binary_search_sequential(self,array, data):
        inicio = 0
        fin = len(array) - 1
        arr = []
        while inicio <= fin:
            medio = (inicio + fin) // 2
            if array[medio] == data:
            # Expandir hacia la izquierda
                aux = medio
                while aux >= 0 and array[aux] == data:
                    arr.append(aux)
                    aux -= 1
                
                # Expandir hacia la derecha
                aux = medio + 1
                while aux < len(array) and array[aux] == data:
                    arr.append(aux)
                    aux += 1
                return arr
            else:
                if data < array[medio]:
                    fin = medio - 1
                else:
                    inicio = medio + 1
                    
    
    def binary_search_sequential_models(self, array, data, attribute):
        inicio = 0
        fin = len(array) - 1
        arr = []
        while inicio <= fin:
            medio = (inicio + fin) // 2
            if getattr(array[medio], attribute) == data:
            # Expandir hacia la izquierda
                aux = medio
                while aux >= 0 and getattr(array[aux], attribute) == data:
                    arr.append(array[aux])
                    aux -= 1
                
                # Expandir hacia la derecha
                aux = medio + 1
                while aux < len(array) and getattr(array[aux], attribute) == data:
                    arr.append(array[aux])
                    aux += 1
                return arr
            else:
                if data < getattr(array[medio], attribute):
                    fin = medio - 1
                else:
                    inicio = medio + 1