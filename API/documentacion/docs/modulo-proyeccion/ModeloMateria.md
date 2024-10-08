# Clase `Materia`

### Descripción General

La clase `Materia` representa una materia que tiene un ID, un nombre, un ciclo y la cédula del docente a cargo. 

## Métodos y Propiedades

### `__init__()`
```python
def __init__(self):
    self.__id = 0
    self.__nombre = ""
    self.__ciclo = 0
    self.__cedulaDocente = ''
```
**Descripción:** Constructor de la clase `Materia`. Inicializa los atributos `__id`, `__nombre`, `__ciclo` y `__cedulaDocente` con valores predeterminados.

### `serializable` (Propiedad)

- `self`: Es una referencia a la instancia actual de la clase Materia.

```python
@property
def serializable(self):
    return {
        "idmateria": self._id,
        "nombre": self._nombre,
        "ciclo": self._ciclo,
        "docente_user_cedula": self._cedulaDocente,
    }
```
**Descripción:** Propiedad que devuelve un diccionario con los atributos de la entidad `Materia` listos para ser serializados.

### `deserialize(data)` (Método)

El método `deserialize` toma un diccionario `data` y crea una instancia de `Materia` con los valores proporcionados en el diccionario. Asigna los valores a los atributos correspondientes y devuelve la instancia de Materia.

- `data`: Es un diccionario que contiene los datos necesarios para deserializar un objeto Materia. Las claves esperadas son idmateria, nombre, ciclo y docente_user_cedula.

```python
def deserialize(self, data):
    materia = Materia()
    materia._id = data["idmateria"]
    materia._nombre = data["nombre"]
    materia._ciclo = data["ciclo"]
    materia._cedulaDocente = data["docente_user_cedula"]
    return materia
```
**Descripción:** Método que deserializa un diccionario de datos en una instancia de `Materia`.
