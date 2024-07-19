
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

- self: Es una referencia a la instancia actual de la clase Docente.

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
El método `deserialize` toma un diccionario `data` y crea una instancia de `Docente` con los valores proporcionados en el diccionario. Asigna los valores a los atributos correspondientes y devuelve la instancia de Docente.

- `data`: Es un diccionario que contiene los datos necesarios para deserializar un objeto Docente. Las claves esperadas son iddocente, user_cedula, cubiculo y experiencia.

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
