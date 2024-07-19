---
sidebar_position: 3
---
# Nodo de una lista enlazada

## Clase: Node

La clase `Node` representa un nodo en una estructura de datos enlazada. Cada nodo contiene un valor de datos y una referencia al siguiente nodo en la lista.

### Constructor: __init__
El constructor inicializa un nodo con los datos proporcionados y una referencia opcional al siguiente nodo.

Parámetros:
- `data` (Object): El valor de los datos almacenados en el nodo.
- `next` (Node, opcional): Una referencia al siguiente nodo en la lista. El valor predeterminado es None.

Atributos:
- `__data` (Object): Almacena el valor de los datos del nodo.
- `__next` (Node): Almacena una referencia al siguiente nodo en la lista.

```python
def __init__(self, data, next=None):
    self.__data = data
    self.__next = next
```