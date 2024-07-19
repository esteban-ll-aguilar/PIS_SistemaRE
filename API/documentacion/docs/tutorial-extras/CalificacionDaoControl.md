---
sidebar_position: 1
---

# CalificacionDaoControl

`CalificacionDaoControl` es una clase que hereda de `DaoAdapter` y se utiliza para gestionar las operaciones de base de datos relacionadas con las calificaciones. A continuación, se detallan sus funciones y propiedades:

### Constructor

```python
def __init__(self):
    super().__init__(Calificacion)
    self.__calificacion = None
```

El constructor inicializa la clase `CalificacionDaoControl` llamando al constructor de la clase base `DaoAdapter` con el modelo `Calificacion`. También inicializa el atributo privado `__calificacion` como `None`.

### Propiedades

#### _calificacion

```python
@property
def _calificacion(self):
    if self.__calificacion is None:
        self.__calificacion = Calificacion()
    return self.__calificacion

@_calificacion.setter
def _calificacion(self, value):
    self.__calificacion = value
```

La propiedad `_calificacion` proporciona acceso al objeto `Calificacion`. Si `__calificacion` es `None`, crea una nueva instancia de `Calificacion`. También tiene un setter para asignar un valor a `__calificacion`.

#### _lista

```python
@property
def _lista(self):
    return self._list()
```

La propiedad `_lista` devuelve una lista de todas las calificaciones almacenadas, utilizando el método `_list` de `DaoAdapter`.

#### save

```python
@property
def save(self):
    self.__calificacion._id = self._lista._length + 1
    print("Guardando Calificacion")
    self._save(self.__calificacion)
```

La propiedad `save` guarda la calificación actual en la base de datos. Primero, asigna un nuevo ID a la calificación basado en la longitud de la lista de calificaciones existentes. Luego, imprime un mensaje indicando que está guardando la calificación y finalmente llama al método `_save` de `DaoAdapter` para realizar la operación de guardado.

### Método

#### merge

```python
def merge(self, pos):
    self._merge(self.__calificacion, pos)
```

El método `merge` actualiza una calificación existente en la base de datos en la posición especificada por `pos`. Llama al método `_merge` de `DaoAdapter` con la calificación actual y la posición como argumentos.
