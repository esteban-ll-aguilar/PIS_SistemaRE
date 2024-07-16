
# Clase `Docente`

### Descripción General

La clase `Docente` es una subclase de la clase `Usuario`. Esta clase representa a un docente y contiene atributos específicos y métodos relacionados con un docente. Extiende la funcionalidad de la clase `Usuario`, de la cual hereda atributos y métodos.

## Métodos y Propiedades

### `__init__()`
```python
def __init__(self):
    super().__init__()
    self.__id = 0
    self.__cubiculo = ''
    self.__experiencia = ''
```
**Descripción:** Constructor de la clase `Docente`. Inicializa los atributos `__id`, `__cubiculo` y `__experiencia` con valores predeterminados. También llama al constructor de la clase `Usuario` utilizando `super().__init__()`.

### `serializable` (Propiedad)
```python
@property
def serializable(self):
    return {
        "iddocente": self._id,
        "user_cedula": self._cedula,
        "cubiculo": self._cubiculo,
        "experiencia": self._experiencia,
    }
```
**Descripción:** Propiedad que devuelve un diccionario con los atributos de la entidad `Docente` listos para ser serializados.

### `deserialize(data)` (Método)
```python
def deserialize(self, data):
    docente = Docente()
    docente._id = data['iddocente']
    docente._cedula = data['user_cedula']
    docente._cubiculo = data['cubiculo']
    docente._experiencia = data['experiencia']
    return docente
```
**Descripción:** Método que deserializa un diccionario de datos en una instancia de `Docente`.
