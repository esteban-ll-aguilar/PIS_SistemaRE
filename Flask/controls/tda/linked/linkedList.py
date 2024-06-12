from controls.tda.linked.node import Node
from controls.exception.linkedListExeption import LinkedEmptyException, ArrayPositionException
import sys
from numbers import Number
from controls.tda.ordenation_methods.quickSort import QuickSort
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
                out.append(node._data)#.__name
                node = node._next

        return out
    
    
    
    def _filter(self, data):
        out = []
        if self.isEmpty:
            out = "List is Empty"
            json = ''
        else:
            node = self.__head
            for i in range(0, self._length):
                
                if hasattr(node._data, '_clienteId') and node._data._clienteId == data:
                    out.append(node._data.serializable)
                elif hasattr(node._data, '_cedula') and node._data._cedula == data:
                    out.append(node._data.serializable)
                elif hasattr(node._data, '_NComprobante') and node._data._NComprobante == data:
                    out.append(node._data.serializable)
                elif hasattr(node._data, '_asignacionDocenteId') and node._data._asignacionDocenteId == data:
                    out.append(node._data.serializable)
                elif hasattr(node._data, '_cicloId') and node._data._cicloId == data:
                    out.append(node._data.serializable)
                node = node._next
            print(out)
        return out

    def __exist__(self, data, ciclo=None):
            node = self.__head
            for i in range(0, self._length):
                print('data',node._data)
                if hasattr(node._data, '_cedula') and node._data._cedula == data:
                    print('Ya existe un nodo con este dato (cedula)')
                    return True, node._data._id, node._data._cedula
                elif hasattr(node._data, '_ciclo') and node._data._ciclo == ciclo and  hasattr(node._data, '_nombre') and node._data._nombre == data:
                    print('Ya existe un nodo con este dato (ciclo y paralelo)')
                    return True, node._data._id, node._data._ciclo
                elif hasattr(node._data, '_correo') and node._data._correo == data:
                    print('Ya existe un nodo con este dato (correo)')
                    return True, node._data._id, node._data._correo
                elif hasattr(node._data, '_nombres') and node._data._nombres == data:
                    print('Ya existe un nodo con este dato (nombre)')
                    return True, node._data._id, node._data._nombres
                node = node._next
            return False, None, None

        
    def detele(self, pos):
        pos = pos 
        if self.isEmpty:
            raise LinkedEmptyException("List is Empty")
        elif pos < 0 or pos >= self._length:
            raise ArrayPositionException("Position is out of range")
        elif pos == 0:
            self.__head = self.__head._next
            self.__length -= 1
            
        elif pos == self._length -1:
            self.__last = self.getNode(pos-1)
            #restarId
            self.__length -= 1
        else:
            node_preview = self.getNode(pos-1)
            node_last = node_preview._next._next
            node_preview._next = node_last
            self.__length -= 1
            
        for i in range(pos, self._length):
            self.getNode(i)._data._id = i+1
    

    
    
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
    def __sizeList__(self):
        size = sys.getsizeof(self.__head) + sys.getsizeof(self.__last) + sys.getsizeof(self.__length)
        node_size = sys.getsizeof(Node)
        size += node_size * self.__length
        return size
    
    @property
    def print(self):
        node = self.__head
        data = ''
        while node != None:
            print('ffffffffffff',node._data)
            data += str(node._data._id) + '    '
            node = node._next
        print(data)
        
    def toList(self, array):
        self.clear
        for i in range(0, len(array)):
            self.__addLast__(array[i])
        
    def sort(self, type = 1):
        if self.isEmpty:
            raise LinkedEmptyException("List empty")
        else:
            array = self.toArray
            if isinstance(array[0], Number) or isinstance(array[0], str):
                quick = QuickSort()
                if type == 1:
                    array = quick.quick_sort(array)
                else:
                    array = quick.quick_sort(array, False)
            
            self.toList(array)
    
    def sort_models(self, attribute,type = 1):
        if self.isEmpty:
            raise LinkedEmptyException("List empty")
        else:
            array = self.toArray
            if isinstance(array[0], object):
                quick = QuickSort()
                if type == 1:
                    array = quick.quick_sort_models(array, attribute)
                else:
                    array = quick.quick_sort_models(array, attribute, False)
            self.toList(array)
        return self
    
        
    def search_number_equals(self, data):
        lista = Linked_List()
        if self.isEmpty:
            raise LinkedEmptyException("List empty")
        else:
            array = self.toArray
            for i in range(0, len(array)):
                if (array[i].lower().startswith(data.lower())):
                    lista.add(array[i], lista._length)

        return lista
       
       
    
    
    