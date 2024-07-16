
# Clase `PeriodoAcademico`

### Descripción General

La clase `PeriodoAcademico` representa un periodo académico con un ID, un nombre, una fecha de inicio y una fecha de fin.

## Métodos y Propiedades

### `__init__()`
```python
def __init__(self):
    self.__id = 0
    self.__nombre = ''
    self.__fechaInicio = ''
    self.__fechaFin = ''
```
**Descripción:** Constructor de la clase `PeriodoAcademico`. Inicializa los atributos `__id`, `__nombre`, `__fechaInicio` y `__fechaFin` con valores predeterminados.

### `serializable` (Propiedad)

- `self`: Es una referencia a la instancia actual de la clase PeriodoAcademico.

```python
@property
def serializable(self):
    return {
        "idpac": self._id,
        "nombre": self._nombre,
        "fecha_inicio": self._fechaInicio,
        "fecha_fin": self._fechaFin
    }
```
**Descripción:** Propiedad que devuelve un diccionario con los atributos de la entidad `PeriodoAcademico` listos para ser serializados.

### `deserialize(data)` (Método)
El método `deserialize` toma un diccionario `data` y crea una instancia de `PeriodoAcademico` con los valores proporcionados en el diccionario. Asigna los valores a los atributos correspondientes y devuelve la instancia de PeriodoAcademico.

- `data:` Es un diccionario que contiene los datos necesarios para deserializar un objeto PeriodoAcademico. Las claves esperadas son idpac, nombre, fecha_inicio y fecha_fin.

```python
def deserialize(self, data):
    periodoAcademico = PeriodoAcademico()
    periodoAcademico._id = data['idpac']
    periodoAcademico._nombre = data['nombre']
    periodoAcademico._fechaInicio = data['fecha_inicio']
    periodoAcademico._fechaFin = data['fecha_fin']
    return periodoAcademico
```
**Descripción:** Método que deserializa un diccionario de datos en una instancia de `PeriodoAcademico`.
