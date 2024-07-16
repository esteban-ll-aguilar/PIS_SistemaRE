
# Clase `RubricaCF`

### Descripción General

La clase `RubricaCF` representa una rúbrica de calificación en el sistema. Esta clase contiene atributos para almacenar el identificador y la descripción de la rúbrica, y proporciona métodos para la serialización y deserialización de sus datos.

## Métodos y Propiedades

### `__init__()`
```python
def __init__(self):
    self.__id = 0
    self.__descripcion = ""
```
**Descripción:** Constructor de la clase `RubricaCF`. Inicializa los atributos `__id` y `__descripcion` con valores predeterminados.

### `serializable` (Propiedad)

- `self`: Es una referencia a la instancia actual de la clase RubricaCF.

```python
@property
def serializable(self):
    return {
        "idrcal": self._id,
        "descripcion": self._descripcion
    }
```
**Descripción:** Propiedad que devuelve un diccionario con los atributos de la entidad `RubricaCF` listos para ser serializados.

### `deserialize(data)` (Método)
El método `deserialize` toma un diccionario `data` y crea una instancia de `RubricaCF` con los valores proporcionados en el diccionario. Asigna los valores a los atributos correspondientes y devuelve la instancia de RubricaCF.

- `data:` Es un diccionario que contiene los datos necesarios para deserializar un objeto RubricaCF. Las claves esperadas son idrcal y descripcion.

```python
def deserialize(self, data):
    rubricaCalificacion = RubricaCF()
    rubricaCalificacion._id = data["idrcal"]
    rubricaCalificacion._descripcion = data["descripcion"]
    return rubricaCalificacion
```
**Descripción:** Método que deserializa un diccionario de datos en una instancia de `RubricaCF`.