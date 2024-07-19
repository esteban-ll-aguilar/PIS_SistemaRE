
# PeriodoAcademicoDaoControl

La clase `PeriodoAcademicoDaoControl` es una clase que extiende de `DaoAdapter` y está diseñada para manejar las operaciones de acceso a datos (DAO) para la entidad `PeriodoAcademico`. Esta clase encapsula la lógica necesaria para interactuar con los datos de `PeriodoAcademico`, proporcionando métodos para guardar, eliminar y fusionar períodos académicos.

### Constructor

```python
def __init__(self):
    super().__init__(PeriodoAcademico)
    self.__periodoAcademico = None
```

El constructor de la clase inicializa la clase base `DaoAdapter` con la entidad `PeriodoAcademico`. También define un atributo privado `__periodoAcademico` que se utilizará para almacenar una instancia de `PeriodoAcademico`.

### Propiedad: _periodoAcademico

```python
@property
def _periodoAcademico(self):
    if self.__periodoAcademico is None:
        self.__periodoAcademico = PeriodoAcademico()
    return self.__periodoAcademico

@_periodoAcademico.setter
def _periodoAcademico(self, value):
    self.__periodoAcademico = value
```

Esta propiedad proporciona acceso al atributo privado `__periodoAcademico`. Si el atributo no ha sido inicializado, crea una nueva instancia de `PeriodoAcademico`. También incluye un setter para permitir la asignación de un valor a `__periodoAcademico`.

### Propiedad: _lista

```python
@property
def _lista(self):
    return self._list()
```

Esta propiedad devuelve la lista de `PeriodoAcademico` utilizando el método `_list` de la clase base `DaoAdapter`.

### Método: save

```python
@property    
def save(self):
    self.__periodoAcademico._id = self._lista._length + 1
    print("Guardando PeriodoAcademico")
    self._save(self.__periodoAcademico)
```

El método `save` asigna un nuevo ID a la instancia de `PeriodoAcademico` basada en la longitud de la lista de períodos académicos actuales, incrementando en uno el último ID existente. Luego, imprime un mensaje de confirmación y llama al método `_save` de la clase base para guardar la instancia.

### Método: delete

```python
def delete(self, pos):
    self._delete(pos)  
```

El método `delete` elimina un `PeriodoAcademico` en la posición especificada utilizando el método `_delete` de la clase base.

### Método: merge

```python
def merge(self, pos):
    self._merge(self.__periodoAcademico, pos)
```

El método `merge` actualiza un `PeriodoAcademico` en la posición especificada utilizando el método `_merge` de la clase base y la instancia actual de `__periodoAcademico`.
