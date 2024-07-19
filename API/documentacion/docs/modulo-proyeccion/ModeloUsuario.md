
# Clase `Usuario`

### Descripción General

La clase `Usuario` representa a un usuario del sistema. Esta clase contiene atributos para almacenar información personal y de autenticación del usuario, y proporciona métodos para la serialización y deserialización de sus datos.

## Métodos y Propiedades

### `__init__()`
```python
def __init__(self):
    self.__id = 0
    self.__cedula = ""
    self.__primerNombre = ""
    self.__segundoNombre = "NULL"
    self.__primerApellido = ""
    self.__segundoApellido = "NULL"
    self.__correo = ""
    self.__contrasena = 'NULL'
    self.__estado = 0
    self.__urlImagen = 'NULL'
    self.__nombreUsuario = 'NULL'
```
**Descripción:** Constructor de la clase `Usuario`. Inicializa los atributos con valores predeterminados.

### `serializable` (Propiedad)
- `self`: Es una referencia a la instancia actual de la clase Usuario.

```python
@property
def serializable(self):
    return {
        "user_iduser": self._id,
        "user_cedula": self._cedula,
        "user_primer_nombre": self._primerNombre,
        "user_segundo_nombre": self._segundoNombre,
        "user_primer_apellido": self._primerApellido,
        "user_segundo_apellido": self._segundoApellido,
        "user_correo": self._correo,
        "user_contrasena": self._contrasena,
        "user_estado": self._estado,
        "user_urlimage": self._urlImagen,
        "user_nombreuser": self._nombreUsuario
    }
```
**Descripción:** Propiedad que devuelve un diccionario con los atributos de la entidad `Usuario` listos para ser serializados.

### `deserialize(data)` (Método)

**Parámetros:**
- `data` (dict): Un diccionario que contiene los datos del usuario. Debe tener las claves `user_iduser`, `user_cedula`, `user_primer_nombre`, `user_segundo_nombre`, `user_primer_apellido`, `user_segundo_apellido`, `user_correo`, `user_contrasena`, `user_estado`, `user_urlimage` y `user_nombreuser`.

**Retorna:**
- `Usuario`: Una instancia de `Usuario` con los datos deserializados.


```python
def deserialize(self, data):
    usuario = Usuario()
    usuario._id = data['user_iduser']
    usuario._cedula = data['user_cedula']
    usuario._primerNombre = data['user_primer_nombre']
    usuario._segundoNombre = data['user_segundo_nombre']
    usuario._primerApellido = data['user_primer_apellido']
    usuario._segundoApellido = data['user_segundo_apellido']
    usuario._correo = data['user_correo']
    usuario._contrasena = data['user_contrasena']
    usuario._estado = data['user_estado']
    usuario._urlImagen = data['user_urlimage']
    usuario._nombreUsuario = data['user_nombreuser']
    return usuario
```
**Descripción:** Método que deserializa un diccionario de datos en una instancia de `Usuario`.
