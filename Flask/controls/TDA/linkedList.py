from controls.TDA.node import Node
from controls.exception.arrayPositionException import ArrayPositionException
from controls.exception.likedEmpty import LikedEmpty

class LinkedList(object):
    def __init__(self):
        self.__head = None
        self.__last = None
        self.__lenght = 0

    @property
    def _lenght(self):
        return self.__lenght

    @_lenght.setter
    def _lenght(self, value):
        self.__lenght = value

    @property
    def isEmpty(self):
        return self.__head == None or self.__lenght == 0

    def __addFirst__(self, data):
        if self.isEmpty:
            node = Node(data)
            self.__head = node
            self.__last = node
            self.__lenght += 1
        else:
            headOld = self.__head
            node = Node(data, headOld)
            self.__head = node
            self.__lenght += 1
    
    def __addLast__(self, data):
        if self.isEmpty:
            self.__addFirst__(data)
        else:
            node = Node(data)
            self.__last.next = node
            self.__last = node
            self.__lenght += 1

    #obtener la posicion de la lista
    def getNode(self, pos):
        if self.isEmpty:
            raise LikedEmpty("list empty")
        elif pos < 0 or pos >= self.__lenght:
            raise ArrayPositionException("position out of range")
        elif pos ==0:
            return self.__head
        elif pos == (self.length -1):
            return self.__last
        else:
            node = self.__head
            cont = 0
            while cont < pos:
                node = node.next
                cont += 1
            return node
    

    def addAt(self, data, pos=0):
        if pos ==0:
            self.__addFirst__(data)
        elif pos == self.__lenght:
            self.__addLast__(data)
        else:
            node_preview = self.getNode(pos-1)
            node_last = node_preview.next
            node = Node(data, node_last)
            node_preview.next = node
            self.__lenght += 1

    def __edit__(self, data, pos = 0):
        if pos == 0:
            self.__head.data = data
        elif pos == self.__lenght:
            self.__last.data = data
        else:
            node = self.__getNode__(pos)
            node._data = data

    @property
    def clear(self):
        self.__head = None
        self.__last = None
        self.__lenght = 0
    
    #funcion para convertir en str
    def __str__(self):
        if self.isEmpty:
            return "list empty"
        else:
            node = self.__head
            string = ""
            while node:
                string += str(node.data) + " -> "
                node = node.next
            return string

    

    