class SequentialSearch:
    
    def sequiential_search(self, array, data):
        if len(array) == 0:
            return Exception('Array is empty')
        else:
            arr = []
            for i in range(len(array)):
                if array[i] == data:
                    arr.append(i)
            return arr
    
    def sequiential_search_models(self, array, attribute, data):
        if len(array) == 0:
            return Exception('Array is empty')
        else:
            arr = []
            for i in range(len(array)):
                if getattr(array[i], attribute) == data:
                    arr.append(i)
            return arr
                
        
        

    