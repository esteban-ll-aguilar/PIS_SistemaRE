from controls.tda.queque.quequeOperation import QuequeOperation
class Queque:
    def __init__(self, top):
        self.__queque = QuequeOperation(top)



    def queque(self, data):
        self.__queque.queque(data)
    
    @property
    def dequeque(self):
        return self.__queque.dequeque
    
    @property
    def print(self):
        self.__queque.print

    @property
    def verify(self):
        return self.__queque.verifyTop