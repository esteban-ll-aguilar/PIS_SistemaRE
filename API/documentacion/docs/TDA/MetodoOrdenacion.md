---
sidebar_position: 1
---
# Metodo de ordenación
## Clase: QuickSort

La clase `QuickSort` implementa métodos para ordenar arrays y listas de objetos en orden ascendente y descendente utilizando el algoritmo de QuickSort.

### Método: `sort_acendent`
Este método ordena un array en orden ascendente. Divide el array en tres listas (menores, iguales y mayores al pivote) y aplica recursivamente el mismo método a las sublistas. Finalmente, concatena las sublistas para formar el array ordenado.

```python
def sort_acendent(self, array):
    if len(array) <= 1:
        return array
    else:
        pivote = array[0]
        lower = []
        equal = []
        bigger = []

        for i in range(0, len(array)):
            if array[i] > pivote:
                lower.append(array[i])
            elif array[i] == pivote:
                equal.append(array[i])
            else:
                bigger.append(array[i])

        lower = self.sort_acendent(lower)
        bigger = self.sort_acendent(bigger)
        array = lower + equal + bigger
        return array
```

### Método: `sort_descendent`

Este método ordena un array en orden descendente. Funciona de manera similar a `sort_acendent`, pero invierte las condiciones para ordenar en orden descendente.

```python
def sort_descendent(self, array):
    if len(array) <= 1:
        return array
    else:
        pivote = array[0]
        lower = []
        equal = []
        bigger = []

        for i in range(0, len(array)):
            if array[i] < pivote:
                lower.append(array[i])
            elif array[i] == pivote:
                equal.append(array[i])
            else:
                bigger.append(array[i])

        lower = self.sort_descendent(lower)
        bigger = self.sort_descendent(bigger)
        array = lower + equal + bigger
        return array

```
### Método: `sort_models_acendent`
Este método ordena una lista de objetos en orden ascendente según un atributo específico. Utiliza `getattr` para obtener el valor del atributo y aplica el algoritmo de QuickSort de manera similar a `sort_acendent`.

```python
def sort_models_acendent(self, array, attribute):
    if len(array) <= 1:
        return array
    else:
        pivote = getattr(array[0], attribute)
        lower = []
        equal = []
        bigger = []

        for i in range(0, len(array)):
            att = getattr(array[i], attribute)
            if att > pivote:
                lower.append(array[i])
            elif att == pivote:
                equal.append(array[i])
            else:
                bigger.append(array[i])

        lower = self.sort_models_acendent(lower, attribute)
        bigger = self.sort_models_acendent(bigger, attribute)
        array = lower + equal + bigger
        return array

```

### Método: `sort_models_descendent`
Este método ordena una lista de objetos en orden descendente según un atributo específico. Funciona de manera similar a `sort_models_acendent`, pero invierte las condiciones para ordenar en orden descendente.
```python
def sort_models_descendent(self, array, attribute):
    if len(array) <= 1:
        return array
    else:
        pivote = getattr(array[0], attribute)
        lower = []
        equal = []
        bigger = []

        for i in range(0, len(array)):
            att = getattr(array[i], attribute)
            if att < pivote:
                lower.append(array[i])
            elif att == pivote:
                equal.append(array[i])
            else:
                bigger.append(array[i])

        lower = self.sort_models_descendent(lower, attribute)
        bigger = self.sort_models_descendent(bigger, attribute)
        array = lower + equal + bigger
        return array
```