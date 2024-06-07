class Selection:
    
    
    def selection_sort_asendent(self, array):
        for i in range(len(array)):
            k = i
            t = array[i]
            for j in range(i+1, len(array)):
                if array[j] < t:
                    k = j
                    t = array[j]
            array[k] = array[i]
            array[i] = t
        return array
    
    def selection_sort_descendent(self, array):
        for i in range(len(array)):
            k = i
            t = array[i]
            for j in range(i+1, len(array)):
                if array[j] > t:
                    k = j
                    t = array[j]
            array[k] = array[i]
            array[i] = t
        return array
    
    
    def selection_sort_models_acendent(self, array, attribute):
        for i in range(len(array)):
            k = i
            t = array[i]
            for j in range(i+1, len(array)):
                if getattr(array[j], attribute) < getattr(t, attribute):
                    k = j
                    t = array[j]
            array[k] = array[i]
            array[i] = t
        return array
    
    
    def selection_sort_models_desendent(self, array, attribute):
        for i in range(len(array)):
            k = i
            t = array[i]
            for j in range(i+1, len(array)):
                if getattr(array[j], attribute) > getattr(t, attribute):
                    k = j
                    t = array[j]
            array[k] = array[i]
            array[i] = t
        return array