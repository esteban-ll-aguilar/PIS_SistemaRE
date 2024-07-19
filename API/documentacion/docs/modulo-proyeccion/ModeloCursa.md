
# Clase `Cursa`

La clase `Cursa` representa una entidad de cursa, que relaciona a un estudiante con una materia, paralelo y docente en un período académico. Proporciona métodos para serializar y deserializar los datos de cursa.

## Métodos y Propiedades

### `__init__()`
```python
def __init__(self):
    self.__id = 0
    self.__estudianteCedula = 0
    self.__materiaId = 0
    self.__paralelo = 0
    self.__docenteCedula = 0
    self.__numeroMMatricula = 1
    self.__periodoAcademicoId = 0
```
**Descripción:** Constructor de la clase. Inicializa todos los atributos privados de la clase con valores por defecto.

### `serializable` (Propiedad)
- self: Es una referencia a la instancia actual de la clase Cursa.

```python
@property
def serializable(self):
    return {
        "idcursa": self._id,
        "estudiante_user_cedula": self._estudianteCedula,
        "materia_idmateria": self._materiaId,   
        "paralelo": self._paralelo,
        "docente_user_cedula": self._docenteCedula,
        "numerommateria": self._numeroMMatricula,
        "periodoacademico_idpac": self._periodoAcademicoId,
    }
```
**Descripción:** Propiedad que devuelve un diccionario con los atributos de la entidad `Cursa` listos para ser serializados.

### `deserialize(data)` (Método)

El método  `deserialize ` toma un diccionario  `data ` y crea una instancia de Cursa con los valores proporcionados en el diccionario. Asigna los valores a los atributos correspondientes y devuelve la instancia de Cursa.

-  `data `: Es un diccionario que contiene los datos necesarios para deserializar un objeto Cursa. Las claves esperadas son idcursa, estudiante_user_cedula, materia_idmateria, paralelo, docente_user_cedula, numerommateria y periodoacademico_id.

```python
def deserialize(self, data):
    cursa = Cursa()
    cursa._id = data['idcursa']
    cursa._estudianteCedula = data['estudiante_user_cedula']
    cursa._materiaId = data['materia_idmateria']
    cursa._paralelo = data['paralelo']
    cursa._docenteCedula = data['docente_user_cedula']
    cursa._numeroMMatricula = data['numerommateria']
    cursa._periodoAcademicoId = data['periodoacademico_idpac']
    return cursa
```
**Descripción:** Método que deserializa un diccionario de datos en una instancia de `Cursa`.

