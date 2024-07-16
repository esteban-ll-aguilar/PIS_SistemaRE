---
sidebar_position: 4
---

# EstudianteDaoControl

`EstudianteDaoControl` es una clase que hereda de `DaoAdapter` y proporciona métodos para gestionar objetos de tipo `Estudiante`. Esta clase maneja la creación, almacenamiento, eliminación y actualización de instancias de `Estudiante` en la base de datos.

## Clase `EstudianteDaoControl`

### Constructor

```python
def __init__(self):
    super().__init__(Estudiante)
    self.__estudiante = None
```

El constructor inicializa la clase base `DaoAdapter` con el modelo `Estudiante` y establece la variable interna `__estudiante` a `None`.

### Propiedad `_estudiante`

```python
@property
def _estudiante(self):
    if self.__estudiante is None:
        self.__estudiante = Estudiante()
    return self.__estudiante

@_estudiante.setter
def _estudiante(self, value):
    self.__estudiante = value
```

Esta propiedad maneja una instancia de `Estudiante`. Si la instancia no existe, se crea una nueva.

### Propiedad `_lista`

```python
@property
def _lista(self):
    return self._list()
```

Esta propiedad retorna una lista de instancias de `Estudiante` desde la base de datos.

### Propiedad `save`

```python
@property
def save(self):
    self.__estudiante._id = self._lista._length + 1
    print("Guardando Estudiante")
    self._save(self.__estudiante)
```

Esta propiedad guarda la instancia actual de `Estudiante` en la base de datos, asignándole un nuevo ID basado en la longitud de la lista de estudiantes.

### Método `delete`

```python
def delete(self, pos):
    self._delete(pos)  
```

Este método elimina una instancia de `Estudiante` de la base de datos en la posición especificada.

### Método `merge`

```python
def merge(self, pos):
    self._merge(self.__estudiante, pos)
```

Este método actualiza una instancia de `Estudiante` en la base de datos en la posición especificada.
