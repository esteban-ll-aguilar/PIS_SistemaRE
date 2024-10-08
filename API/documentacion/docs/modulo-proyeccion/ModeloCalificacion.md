
# Clase `Calificacion`

### Descripción General
La clase `Calificacion` representa una entidad de calificación y contiene atributos que describen los detalles de una calificación. Proporciona métodos para serializar y deserializar los datos de la calificación.

### Métodos y Propiedades

#### `__init__()`
```python
def __init__(self) -> None:
    self.__id = 0
    self.__valor = 0
    self.__rubricaCalificacionId = 0
    self.__unidadId = 0
    self.__cursaId = 0
```
**Descripción:** Constructor de la clase. Inicializa todos los atributos privados de la clase con valores por defecto.


### `serializable` (Propiedad)

- self: Es una referencia a la instancia actual de la clase Calificacion.

```python
@property
def serializable(self):
    return {
        "idcalificacion": self._id,
        "valor": self._valor,
        "rubricacf_idrcal": self._rubricaCalificacionId,
        "unidad_idunidad": self._unidadId,
        "cursa_idcursa": self._cursaId
    }
```
**Descripción:** Propiedad que devuelve un diccionario con los atributos de la calificación listos para ser serializados.

### `deserialize(data)` (Método)

`deserialize` (data) (Método)
El método deserialize toma un diccionario `data` y crea una instancia de `Calificacion` con los valores proporcionados en el diccionario. Asigna los valores a los atributos correspondientes y devuelve la instancia de Calificacion.

- `data`: Es un diccionario que contiene los datos necesarios para deserializar un objeto Calificacion. Las claves esperadas son idcalificacion, valor, rubricacf_idrcal, unidad_idunidad y cursa_idcursa.

```python
def deserialize(self, data):
    calificacion = Calificacion()
    calificacion._id = data["idcalificacion"]
    calificacion._valor = data["valor"]
    calificacion._rubricaCalificacionId = data["rubricacf_idrcal"]
    calificacion._unidadId = data["unidad_idunidad"]
    calificacion._cursaId = data["cursa_idcursa"]
    return calificacion
```
**Descripción:** Método que deserializa un diccionario de datos en una instancia de `Calificacion`.

