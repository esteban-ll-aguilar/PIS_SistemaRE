# RubricaCalificacionDaoControl

La clase `RubricaCalificacionDaoControl` es una clase que extiende de `DaoAdapter` y está diseñada para manejar las operaciones de acceso a datos (DAO) para la entidad `RubricaCF`. Esta clase encapsula la lógica necesaria para interactuar con los datos de `RubricaCF`, proporcionando métodos para guardar, eliminar y fusionar rúbricas de calificación.

### Constructor

```python
def __init__(self):
    super().__init__(RubricaCF)
    self.__rubricaCalificacion = None
```

El constructor de la clase inicializa la clase base `DaoAdapter` con la entidad `RubricaCF`. También define un atributo privado `__rubricaCalificacion` que se utilizará para almacenar una instancia de `RubricaCF`.

### Propiedad: _rubricaCalificacion

```python
@property
def _rubricaCalificacion(self):
    if self.__rubricaCalificacion is None:
        self.__rubricaCalificacion = RubricaCF()
    return self.__rubricaCalificacion

@_rubricaCalificacion.setter
def _rubricaCalificacion(self, value):
    self.__rubricaCalificacion = value
```

Esta propiedad proporciona acceso al atributo privado `__rubricaCalificacion`. Si el atributo no ha sido inicializado, crea una nueva instancia de `RubricaCF`. También incluye un setter para permitir la asignación de un valor a `__rubricaCalificacion`.

### Propiedad: _lista

```python
@property
def _lista(self):
    return self._list()
```

Esta propiedad devuelve la lista de `RubricaCF` utilizando el método `_list` de la clase base `DaoAdapter`.

### Método: save

```python
@property    
def save(self):
    self.__rubricaCalificacion._id = self._lista._length + 1
    print("Guardando RubricaCalificacion")
    self._save(self.__rubricaCalificacion)
```

El método `save` asigna un nuevo ID a la instancia de `RubricaCF` basada en la longitud de la lista de rúbricas de calificación actuales, incrementando en uno el último ID existente. Luego, imprime un mensaje de confirmación y llama al método `_save` de la clase base para guardar la instancia.

### Método: delete

```python
def delete(self, pos):
    self._delete(pos)  
```

El método `delete` elimina una `RubricaCF` en la posición especificada utilizando el método `_delete` de la clase base.

### Método: merge

```python
def merge(self, pos):
    self._merge(self.__rubricaCalificacion, pos)
```

El método `merge` actualiza una `RubricaCF` en la posición especificada utilizando el método `_merge` de la clase base y la instancia actual de `__rubricaCalificacion`.
