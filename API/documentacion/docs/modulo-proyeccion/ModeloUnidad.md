
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
```python
def deserialize(self, data):
    unidad = Unidad()
    unidad._id = data["idunidad"]
    unidad._nombre = data["nombre"]
    unidad._nUnidad = data["nunidad"]
    unidad._materiaId = data["materia_idmateria"]
    return unidad
```
**Descripción:** Método que deserializa un diccionario de datos en una instancia de `Unidad`.

**Parámetros:**
- `data` (dict): Un diccionario que contiene los datos de la unidad. Debe tener las claves `idunidad`, `nombre`, `nunidad` y `materia_idmateria`.

**Retorna:**
- `Unidad`: Una instancia de `Unidad` con los datos deserializados.
