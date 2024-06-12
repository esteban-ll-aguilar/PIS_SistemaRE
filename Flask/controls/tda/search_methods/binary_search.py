class BinarySearch:
    
    def binary_search(self, array, data):
        inicio = 0
        fin = len(array) - 1
        
        while inicio <= fin:
            medio = (inicio + fin) // 2
            if array[medio] == data:
                return array[medio], medio
            else:
                if data < array[medio]:
                    fin = medio - 1
                else:
                    inicio = medio + 1

    def binary_search_models(self, array, attribute, data):
        inicio = 0
        fin = len(array) - 1
        
        while inicio <= fin:
            medio = (inicio + fin) // 2
            if getattr(array[medio], attribute) == data:
                return array[medio], medio
            else:
                if data < getattr(array[medio], attribute):
                    fin = medio - 1
                else:
                    inicio = medio + 1
        

        
        
        
        
            
            
        
                
                