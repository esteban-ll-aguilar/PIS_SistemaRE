
# UnidadDaoControl

La clase `UnidadDaoControl` es una clase que extiende de `DaoAdapter` y está diseñada para manejar las operaciones de acceso a datos (DAO) para la entidad `Unidad`. Esta clase encapsula la lógica necesaria para interactuar con los datos de `Unidad`, proporcionando métodos para guardar, eliminar y fusionar unidades.

### Constructor

```python
def __init__(self):
    super().__init__(Unidad)
    self.__unidad = None
```

El constructor de la clase inicializa la clase base `DaoAdapter` con la entidad `Unidad`. También define un atributo privado `__unidad` que se utilizará para almacenar una instancia de `Unidad`.

### Propiedad: _unidad

```python
@property
def _unidad(self):
    if self.__unidad is None:
        self.__unidad = Unidad()
    return self.__unidad

@_unidad.setter
def _unidad(self, value):
    self.__unidad = value
```

Esta propiedad proporciona acceso al atributo privado `__unidad`. Si el atributo no ha sido inicializado, crea una nueva instancia de `Unidad`. También incluye un setter para permitir la asignación de un valor a `__unidad`.

### Propiedad: _lista

```python
@property
def _lista(self):
    return self._list()
```

Esta propiedad devuelve la lista de `Unidad` utilizando el método `_list` de la clase base `DaoAdapter`.

### Método: save

```python
@property    
def save(self):
    self.__unidad._id = self._lista._length + 1
    print("Guardando Unidad")
    self._save(self.__unidad)
```

El método `save` asigna un nuevo ID a la instancia de `Unidad` basada en la longitud de la lista de unidades actuales, incrementando en uno el último ID existente. Luego, imprime un mensaje de confirmación y llama al método `_save` de la clase base para guardar la instancia.

### Método: delete

```python
def delete(self, pos):
    self._delete(pos)  
```

El método `delete` elimina una `Unidad` en la posición especificada utilizando el método `_delete` de la clase base.

### Método: merge

```python
def merge(self, pos):
    self._merge(self.__unidad, pos)
```

El método `merge` actualiza una `Unidad` en la posición especificada utilizando el método `_merge` de la clase base y la instancia actual de `__unidad`.
