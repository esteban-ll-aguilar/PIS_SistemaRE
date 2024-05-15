from controls.tda.linked.node import Node
from controls.exception.linkedListExeption import LinkedEmptyException, ArrayPositionException
class Linked_List(object):
    def __init__(self):
        self.__head = None
        self.__last = None
        self.__length = 0
        


    @property
    def _length(self):
        return self.__length

    @_length.setter
    def _length(self, value):
        self.__length = value


    @property
    def isEmpty(self):
        return self.__head == None or self.__length == 0
    
    def __addFirst__(self, data):
        if self.isEmpty:
            node = Node(data)
            self.__head = node
            self.__last = node
            self.__length += 1
        else: 
            headOld = self.__head
            self.__head = Node(data, headOld)
            self.__length += 1

    def __addLast__(self, data):
            if self.isEmpty:
                self.__addFirst__(data)
            else: 
                node = Node(data)
                self.__last._next = node
                self.__last = node
                self.__length += 1

    """ def __addIntermed__(self, data, pos):
            self.getNode(pos-1)._next = Node(data, self.getNode(pos))
            self.__length += 1 """

                
    def edit(self, data, pos=0):
        if pos == 0:
            self.__head._data = data
        elif pos == self._length:
            self.__last._data = data
        else:
            self.getNode(pos)._data = data
                   
    
    def getNode(self, pos):
        if self.isEmpty:
            raise LinkedEmptyException("List is Empty")
        elif pos < 0 or pos >= self._length:
            raise ArrayPositionException("Position is out of range")
        elif pos == 0:
            return self.__head
        elif pos == self._length -1 :
            return self.__last
        else:
            count = 0
            node = self.__head
            while count < pos:
                node = node._next
                count += 1
            return node
        
    def get(self, pos):
        return self.getNode(pos)._data
        

    def add(self, data, pos):
        if pos == 0:
            self.__addFirst__(data)
        elif pos == self._length:
            self.__addLast__(data)
        else:
            node_preview = self.getNode(pos-1)
            node_last = node_preview._next
            node_preview._next = Node(data, node_last)
            self.__length += 1
    
    
    @property
    def clear(self):
        self.__head = None
        self.__last = None
        self.__length = 0


    @property    
    def toArray(self):
        out = []
        if self.isEmpty:
            out = "List is Empty"
        else:
            node = self.__head
            while node!= None:
                out.append(node._data.__name)
                node = node._next

        return out
    

    



    
    
        
    
    
    def detele(self, pos):
        if self.isEmpty:
            raise LinkedEmptyException("List is Empty")
        elif pos < 0 or pos >= self._length:
            raise ArrayPositionException("Position is out of range")
        elif pos == 0:
            self.__head = self.__head._next
            self.__length -= 1
        elif pos == self._length -1:
            node = self.getNode(pos-1)
            node._next = None
            self.__last = node
            self.__length -= 1
        else:
            node_preview = self.getNode(pos-1)
            node_last = node_preview._next._next
            node_preview._next = node_last
            self.__length -= 1

    

        
    
    def __str__(self) -> str:
        out = ""
        if self.isEmpty:
            out = "List is Empty"
        else:
            node = self.__head
            while node!= None:
                out += str(node._data) +'\t'
                node = node._next
            

        return out
    
    @property
    def print(self):
       node = self.__head
       data = ''

       while node != None:
            data += str(node._data)+ '    '
            node = node._next
       print(data) 