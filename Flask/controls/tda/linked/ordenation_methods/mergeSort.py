class MergeSort:
    def sort_acendent(self, array):
        if len(array) <= 1:
            return array
        else: 
            return self.merge_sort(array, True)
    
    def sort_descendent(self, array):
        if len(array) <= 1:
            return array
        else: 
            return self.merge_sort(array, False)
    
    
    def sort_models_acendent(self, array, attribute):
        if len(array) <= 1:
            return array
        else: 
            return self.merge_sort_models(array, attribute, True)
            
    def sort_models_descendent(self, array, attribute):
        if len(array) <= 1:
            return array
        else: 
            return self.merge_sort_models(array, attribute, False)
    
    
    def merge_sort_models(self, array, attribute, isacendent=True):
        if len(array) > 1:
            mitad = len(array) // 2
            izquierda = array[:mitad]
            derecha = array[mitad:]
            self.merge_sort_models(izquierda, attribute, isacendent)
            self.merge_sort_models(derecha, attribute, isacendent)
            i = j = k = 0
            if isacendent:
                while i < len(izquierda) and j < len(derecha):
                    if getattr(izquierda[i], attribute) >= getattr(derecha[j], attribute):
                        array[k] = izquierda[i]
                        i += 1
                    else:
                        array[k] = derecha[j]
                        j += 1
                    k += 1
            else:
                while i < len(izquierda) and j < len(derecha):
                    if getattr(izquierda[i], attribute) <= getattr(derecha[j], attribute):
                        array[k] = izquierda[i]
                        i += 1
                    else:
                        array[k] = derecha[j]
                        j += 1
                    k += 1
            while i < len(izquierda):
                array[k] = izquierda[i]
                i += 1
                k += 1
            while j < len(derecha):
                array[k] = derecha[j]
                j += 1
                k += 1
        return array
        
    def merge_sort(self, array, isacendent=True):  
        if len(array) > 1:
            mitad = len(array) // 2
            izquierda = array[:mitad]
            derecha = array[mitad:]

            # Llamadas recursivas para dividir el array
            self.merge_sort(izquierda, isacendent)
            self.merge_sort(derecha, isacendent)

            i = j = k = 0

            # Ordenar y fusionar las sublistas
            if isacendent:
                while i < len(izquierda) and j < len(derecha):
                    if izquierda[i] >= derecha[j]:
                        array[k] = izquierda[i]
                        i += 1
                    else:
                        array[k] = derecha[j]
                        j += 1
                    k += 1
            else:
                while i < len(izquierda) and j < len(derecha):
                    if izquierda[i] <= derecha[j]:
                        array[k] = izquierda[i]
                        i += 1
                    else:
                        array[k] = derecha[j]
                        j += 1
                    k += 1

            # Añadir los elementos restantes
            while i < len(izquierda):
                array[k] = izquierda[i]
                i += 1
                k += 1

            while j < len(derecha):
                array[k] = derecha[j]
                j += 1
                k += 1

        return array  # Devolver el array ordenado
