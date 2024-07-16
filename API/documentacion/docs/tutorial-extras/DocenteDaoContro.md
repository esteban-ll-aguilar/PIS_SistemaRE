---
sidebar_position: 3
---

# DocenteDaoControl

`DocenteDaoControl` es una clase que hereda de `DaoAdapter` y se utiliza para gestionar las operaciones de base de datos relacionadas con los docentes. A continuación, se detallan sus funciones y propiedades:

## Constructor

```python
def __init__(self):
    super().__init__(Docente)
    self.__docente = None
```

El constructor inicializa la clase `DocenteDaoControl` llamando al constructor de la clase base `DaoAdapter` con el modelo `Docente`. También inicializa el atributo privado `__docente` como `None`.

## Propiedades

### _docente

```python
@property
def _docente(self):
    if self.__docente is None:
        self.__docente = Docente()
    return self.__docente

@_docente.setter
def _docente(self, value):
    self.__docente = value
```

La propiedad `_docente` proporciona acceso al objeto `Docente`. Si `__docente` es `None`, crea una nueva instancia de `Docente`. También tiene un setter para asignar un valor a `__docente`.

### _lista

```python
@property
def _lista(self):
    return self._list()
```

La propiedad `_lista` devuelve una lista de todos los docentes almacenados, utilizando el método `_list` de `DaoAdapter`.

### save

```python
@property
def save(self):
    self.__docente._id = self._lista._length + 1
    print("Guardando Docente")
    self._save(self.__docente)
```

La propiedad `save` guarda el docente actual en la base de datos. Primero, asigna un nuevo ID al docente basado en la longitud de la lista de docentes existentes. Luego, imprime un mensaje indicando que está guardando el docente y finalmente llama al método `_save` de `DaoAdapter` para realizar la operación de guardado.

## Métodos

### delete

```python
def delete(self, pos):
    self._delete(pos)
```

El método `delete` elimina un docente existente en la posición especificada por `pos`. Llama al método `_delete` de `DaoAdapter` con la posición como argumento.

### merge

```python
def merge(self, pos):
    self._merge(self.__docente, pos)
```

El método `merge` actualiza un docente existente en la base de datos en la posición especificada por `pos`. Llama al método `_merge` de `DaoAdapter` con el docente actual y la posición como argumentos.
