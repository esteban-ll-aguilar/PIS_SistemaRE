class QuickSort:
    
    def quick_sort(self, array, isacendent = True):
        if len(array)<=1:
            return array
        else:
            pivote = array[0]
            lower = []
            equal = []
            bigger = []
            
            for i in range(0, len(array)):
                if array[i] < pivote:
                    lower.append(array[i])
                elif array[i] == pivote:
                    equal.append(array[i])
                else:
                    bigger.append(array[i])
                    
            lower = self.quick_sort(lower, isacendent)
            bigger = self.quick_sort(bigger, isacendent)
            
            if isacendent:
                array = lower + equal + bigger
            else:
                array = bigger + equal + lower
            return array
        
        
    def quick_sort_models(self, array, attribute, isacendent = True):
        if len(array)<=1:
            return array
        else:
            pivote = getattr(array[0], attribute)
            lower = []
            equal = []
            bigger = []
            
            for i in range(0, len(array)):
                if getattr(array[i], attribute) < pivote:
                    lower.append(array[i])
                elif getattr(array[i], attribute) == pivote:
                    equal.append(array[i])
                else:
                    bigger.append(array[i])
                    
            lower = self.quick_sort_models(lower, attribute, isacendent)
            bigger = self.quick_sort_models(bigger, attribute, isacendent)
            
            if isacendent:
                array = lower + equal + bigger
            else:
                array = bigger + equal + lower
            return array
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
    
    