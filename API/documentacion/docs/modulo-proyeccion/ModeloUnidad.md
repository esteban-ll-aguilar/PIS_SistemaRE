
# Clase `Unidad`

### Descripción General

La clase `Unidad` representa una unidad de una materia en el sistema. Esta clase contiene atributos para almacenar el identificador, el nombre, el número de unidad y el identificador de la materia a la que pertenece la unidad, y proporciona métodos para la serialización y deserialización de sus datos.

## Métodos y Propiedades

### `__init__()`
```python
def __init__(self):
    self.__id = 0
    self.__nombre = ""
    self.__nUnidad = 0
    self.__materiaId = 0
```
**Descripción:** Constructor de la clase `Unidad`. Inicializa los atributos `__id`, `__nombre`, `__nUnidad` y `__materiaId` con valores predeterminados.

### `serializable` (Propiedad)

- `self`: Es una referencia a la instancia actual de la clase unidad.

```python
@property
def serializable(self):
    return {
        "idunidad": self._id,
        "nombre": self._nombre,
        "nunidad": self._nUnidad,
        "materia_idmateria": self._materiaId
    }
```
**Descripción:** Propiedad que devuelve un diccionario con los atributos de la entidad `Unidad` listos para ser serializados.

### `deserialize(data)` (Método)
El método `deserialize` toma un diccionario `data` y crea una instancia de `unidad` con los valores proporcionados en el diccionario. Asigna los valores a los atributos correspondientes y devuelve la instancia de unidad.

- `data:` Es un diccionario que contiene los datos necesarios para deserializar un objeto unidad. Las claves esperadas son idunidad, nombre, Numero de unidad (nunidad) y materiaID.

```python
def deserialize(self, data):
    unidad = Unidad()
    unidad._id = data["idunidad"]
    unidad._nombre = data["nombre"]
    unidad._nUnidad = data["nunidad"]
    unidad._materiaId = data["materia_idmateria"]
    return unidad
```
