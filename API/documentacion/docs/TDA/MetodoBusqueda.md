---
sidebar_position: 2
---
# Metodo de busqueda

## Clase: SequentialBinarySearch

La clase `SequentialBinarySearch` implementa métodos para realizar búsquedas secuenciales y binarias en arrays y listas de objetos.

### Método: search

Este método busca un valor específico (`data`) en un array ordenado (`array`). Si encuentra el valor, expande la búsqueda hacia la izquierda y la derecha para encontrar todas las ocurrencias del valor en el array y las retorna en una lista.

Parámetros:
- `array` (list): El array en el que se realizará la búsqueda.
- `data` (any): El valor que se está buscando.
Retorno:
- `arr` (list): Lista con todas las ocurrencias del valor data en el array.

```python
def search(self, array, data):
    inicio = 0
    fin = len(array) - 1
    arr = []
    while inicio <= fin:
        medio = (inicio + fin) // 2
        if array[medio] == data:
            # Expandir hacia la izquierda
            aux = medio
            while aux >= 0 and array[aux] == data:
                arr.append(array[aux])
                aux -= 1
            # Expandir hacia la derecha
            aux = medio + 1
            while aux < len(array) and array[aux] == data:
                arr.append(array[aux])
                aux += 1
            return arr
        else:
            if data < array[medio]:
                fin = medio - 1
            else:
                inicio = medio + 1
```
### Método: search_models
Este método busca un valor específico (`data`) en una lista de objetos (`array`) basada en un atributo específico (`attribute`). Si encuentra el valor, expande la búsqueda hacia la izquierda y la derecha para encontrar todas las ocurrencias del valor en el atributo y las retorna en una lista.

Parámetros:
- `array` (list): La lista de objetos en la que se realizará la búsqueda.
- `data` (any): El valor que se está buscando.
- `attribute` (str): El nombre del atributo en los objetos de la lista sobre el cual se realizará la búsqueda.
Retorno:
- `arr` (list): Lista con todas las ocurrencias del valor data en el atributo especificado de los objetos en la lista.
- `None`: Si no se encuentra ninguna ocurrencia del valor data.

```python
def search_models(self, array, data, attribute):
    inicio = 0
    fin = len(array) - 1
    arr = []

    while inicio <= fin:
        medio = (inicio + fin) // 2
        if getattr(array[medio], attribute) == data:
            # Recorrer hacia la izquierda
            aux = medio
            while aux >= 0 and getattr(array[aux], attribute) == data:
                arr.append(array[aux])
                aux -= 1

            # Recorrer hacia la derecha
            aux = medio + 1
            while aux < len(array) and getattr(array[aux], attribute) == data:
                arr.append(array[aux])
                aux += 1
            return arr
        else:
            if data < getattr(array[medio], attribute):
                fin = medio - 1
            else:
                inicio = medio + 1

    return None

```
