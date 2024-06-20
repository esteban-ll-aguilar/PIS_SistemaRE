from numbers import Number
class BinarySearch:
    
    def search(self, array, data):
        inicio = 0
        fin = len(array) - 1
        aux = []
        
        while inicio <= fin:
            medio = (inicio + fin) // 2
            if array[medio] == data:
                aux.append(array[medio])
                return aux
            else:
                if data < array[medio]:
                    fin = medio - 1
                else:
                    inicio = medio + 1
        

    def search_models(self, array, attribute, data):
        inicio = 0
        fin = len(array) - 1
        aux = []
        
        if (data.replace('.', '', 1).isdigit() or data.isdigit()) and  len(data) < 10:
            data = float(data)
        
        while inicio <= fin:
            medio = (inicio + fin) // 2
            if getattr(array[medio], attribute) == data:
                aux.append(array[medio])
                return aux
            else:
                if data < getattr(array[medio], attribute):
                    fin = medio - 1
                else:
                    inicio = medio + 1
        

        
        
        
        
            
            
        
                
                