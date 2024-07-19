---
sidebar_position: 2
---

# CursaDaoControl

`CursaDaoControl` es una clase que hereda de `DaoAdapter` y proporciona métodos para gestionar objetos de tipo `Cursa`. Esta clase maneja la creación, almacenamiento, eliminación y actualización de instancias de `Cursa` en la base de datos.

## Clase `CursaDaoControl`

### Constructor

```python
def __init__(self):
    super().__init__(Cursa)
    self.__cursa = None
```

El constructor inicializa la clase base `DaoAdapter` con el modelo `Cursa` y establece la variable interna `__cursa` a `None`.

### Propiedad `_cursa`

```python
@property
def _cursa(self):
    if self.__cursa is None:
        self.__cursa = Cursa()
    return self.__cursa

@_cursa.setter
def _cursa(self, value):
    self.__cursa = value
```

Esta propiedad maneja una instancia de `Cursa`. Si la instancia no existe, se crea una nueva.

### Propiedad `_lista`

```python
@property
def _lista(self):
    return self._list()
```

Esta propiedad retorna una lista de instancias de `Cursa` desde la base de datos.

### Propiedad `save`

```python
@property
def save(self):
    self.__cursa._id = self._lista._length + 1
    print("Guardando Cursa")
    self._save(self.__cursa)
```

Esta propiedad guarda la instancia actual de `Cursa` en la base de datos, asignándole un nuevo ID basado en la longitud de la lista de cursas.

### Método `delete`

```python
def delete(self, pos):
    self._delete(pos)  
```

Este método elimina una instancia de `Cursa` de la base de datos en la posición especificada.

### Método `merge`

```python
def merge(self, pos):
    self._merge(self.__cursa, pos)
```

Este método actualiza una instancia de `Cursa` en la base de datos en la posición especificada.
