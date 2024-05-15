from controls.tda.linked.linkedList import Linked_List
from controls.exception.linkedListExeption import LinkedEmptyException
class QuequeOperation(Linked_List):
    def __init__(self, top):
        super().__init__()
        self.__top = top


    @property
    def _top(self):
        return self.__top

    @_top.setter
    def _top(self, value):
        self.__top = value

    @property
    def verifyTop(self):
        return self._length < self.__top
    
    
    def queque(self, data):
        if self.verifyTop:
            self.add(data, self._length)
        else:
            raise LinkedEmptyException("Queque is Full")
        
    @property
    def dequeque(self):
        if self.isEmpty:
            raise LinkedEmptyException("Queque is Empty")
        else:
            self.detele(0)


    
