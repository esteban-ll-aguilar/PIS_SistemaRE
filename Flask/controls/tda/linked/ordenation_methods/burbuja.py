class Burbuja:
    def sort_acendent(self,array, attribute):
        for i in range(0, len(array)-1):
            for j in range(1, len(array)):
                if getattr(array[j-1], attribute) > getattr(array[j], attribute):
                    temp = array[j-1]
                    array[j-1] = array[j]
                    array[j] = temp
        return array
            
    def sort_decendent(self,array, attribute):
        for i in range(0, len(array)-1):
            for j in range(1, len(array)):
                if getattr(array[j-1], attribute) < getattr(array[j], attribute):
                    temp = array[j-1]
                    array[j-1] = array[j]
                    array[j] = temp
        return array
            
    def sort_number_acendent(self,array):
        for i in range(0, len(array)-1):
            for j in range(1, len(array)):
                if array[j-1] > array[j]:
                    temp = array[j-1]
                    array[j-1] = array[j]
                    array[j] = temp
        
        return array
    
    def sort_number_decendent(self,array):
        for i in range(0, len(array)-1):
            for j in range(1, len(array)):
                if array[j-1] < array[j]:
                    temp = array[j-1]
                    array[j-1] = array[j]
                    array[j] = temp
        return array
                