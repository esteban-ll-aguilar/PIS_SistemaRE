# Lista Enlazada

## Clase: Linked_List

La clase `Linked_List` implementa una lista enlazada con varias operaciones para manejar los nodos y los datos almacenados en ellos.

### Constructor
El constructor inicializa una lista enlazada vacía, con la cabeza ( `__head `), el último nodo (`__last`) y la longitud (`__length`) establecidos a `None` y 0, respectivamente.
```python
def __init__(self):
    self.__head = None
    self.__last = None
    self.__length = 0
```
### Método: addFirst
Este método agrega un nuevo nodo al inicio de la lista. Si la lista está vacía, crea un nuevo nodo y lo establece como cabeza y último nodo. De lo contrario, inserta el nuevo nodo antes de la cabeza actual.

```python
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

```
### Método: addLast
Este método agrega un nuevo nodo al final de la lista. Si la lista está vacía, llama a `__addFirst__`. De lo contrario, inserta el nuevo nodo después del último nodo actual.

```python
def __addLast__(self, data):
    if self.isEmpty:
        self.__addFirst__(data)
    else: 
        node = Node(data)
        self.__last._next = node
        self.__last = node
        self.__length += 1

```
### Método: edit
Este método edita el dato de un nodo en una posición específica. Si la posición es `0`, edita la cabeza. Si la posición es la longitud de la lista, edita el último nodo. De lo contrario, edita el nodo en la posición dada.

```python
def edit(self, data, pos=0):
    if pos == 0:
        self.__head._data = data
    elif pos == self._length:
        self.__last._data = data
    else:
        self.getNode(pos)._data = data

```
### Método: getNode
Este método devuelve el nodo en una posición específica. Lanza excepciones si la lista está vacía o la posición está fuera de rango.

```python
def getNode(self, pos):
    if self.isEmpty:
        raise LinkedEmptyException("List is Empty")
    elif pos < 0 o pos >= self._length:
        raise ArrayPositionException("Position is out of range")
    elif pos == 0:
        return self.__head
    elif pos == self._length - 1:
        return self.__last
    else:
        count = 0
        node = self.__head
        while count < pos:
            node = node._next
            count += 1
        return node

```
### Método: add
Este método agrega un nuevo nodo en una posición específica. Si la posición es `0`, llama a `__addFirst__`. Si la posición es la longitud de la lista, llama a `__addLast__`. De lo contrario, inserta el nuevo nodo en la posición dada.
```python
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
```
### Propiedad: clear
Esta propiedad limpia la lista, estableciendo la cabeza, el último nodo y la longitud a sus valores iniciales.

```python
@property
def clear(self):
    self.__head = None
    self.__last = None
    self.__length = 0

```
