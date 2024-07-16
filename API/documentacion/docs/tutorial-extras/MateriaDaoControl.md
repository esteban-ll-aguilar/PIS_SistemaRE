
# MateriaDaoControl

`MateriaDaoControl` es una clase que hereda de `DaoAdapter` y proporciona métodos para gestionar objetos de tipo `Materia`. Esta clase maneja la creación, almacenamiento, eliminación y actualización de instancias de `Materia` en la base de datos.

## Clase `MateriaDaoControl`

### Constructor

```python
def __init__(self):
    super().__init__(Materia)
    self.__materia = None
```

El constructor inicializa la clase base `DaoAdapter` con el modelo `Materia` y establece la variable interna `__materia` a `None`.

### Propiedad `_materia`

```python
@property
def _materia(self):
    if self.__materia is None:
        self.__materia = Materia()
    return self.__materia

@_materia.setter
def _materia(self, value):
    self.__materia = value
```

Esta propiedad maneja una instancia de `Materia`. Si la instancia no existe, se crea una nueva.

### Propiedad `_lista`

```python
@property
def _lista(self):
    return self._list()
```

Esta propiedad retorna una lista de instancias de `Materia` desde la base de datos.

### Propiedad `save`

```python
@property
def save(self):
    self.__materia._id = self._lista._length + 1
    print("Guardando Materia")
    self._save(self.__materia)
```

Esta propiedad guarda la instancia actual de `Materia` en la base de datos, asignándole un nuevo ID basado en la longitud de la lista de materias.

### Método `delete`

```python
def delete(self, pos):
    self._delete(pos)  
```

Este método elimina una instancia de `Materia` de la base de datos en la posición especificada.

### Método `merge`

```python
def merge(self, pos):
    self._merge(self.__materia, pos)
```

Este método actualiza una instancia de `Materia` en la base de datos en la posición especificada.
