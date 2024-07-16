
# Clase `Estudiante`

### Descripción General

La clase `Estudiante` es una subclase de la clase `Usuario`. Esta clase representa a un estudiante y contiene atributos específicos y métodos relacionados con un estudiante. Extiende la funcionalidad de la clase `Usuario`, de la cual hereda atributos y métodos.

## Métodos y Propiedades

### `__init__()`
```python
def __init__(self):
    super().__init__()
    self.__id = 0
    self.__becaEconomica = "NULL"
    self.__fechaNacimiento = ""
```
**Descripción:** Constructor de la clase `Estudiante`. Inicializa los atributos `__id`, `__becaEconomica` y `__fechaNacimiento` con valores predeterminados. También llama al constructor de la clase `Usuario` utilizando `super().__init__()`.

### `serializable` (Propiedad)

- `self`: Es una referencia a la instancia actual de la clase Estudiante.


```python
@property
def serializable(self):
    return {
        "idestudiante": self._id,
        "user_cedula": self._cedula,
        "beca_economica": self._becaEconomica,
        "fecha_nacimiento": self._fechaNacimiento,
    }
```
**Descripción:** Propiedad que devuelve un diccionario con los atributos de la entidad `Estudiante` listos para ser serializados.

### `deserialize(data)` (Método)

El método `deserialize` toma un diccionario `data` y crea una instancia de `Estudiante` con los valores proporcionados en el diccionario. Asigna los valores a los atributos correspondientes y devuelve la instancia de Estudiante.

- `data:` Es un diccionario que contiene los datos necesarios para deserializar un objeto Estudiante. Las claves esperadas son idestudiante, user_cedula, beca_economica y fecha_nacimiento.

```python
def deserialize(self, data):
    estudiante = Estudiante()
    estudiante._id = data['idestudiante']
    estudiante._cedula = data['user_cedula']
    estudiante._becaEconomica = data['beca_economica']
    estudiante._fechaNacimiento = data['fecha_nacimiento']
    return estudiante
```
**Descripción:** Método que deserializa un diccionario de datos en una instancia de `Estudiante`.
