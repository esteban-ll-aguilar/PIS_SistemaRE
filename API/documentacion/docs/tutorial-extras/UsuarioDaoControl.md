
# UsuarioDaoControl

La clase `UsuarioDaoControl` extiende de `DaoAdapter` y se utiliza para gestionar operaciones relacionadas con la entidad `Usuario`.

### Métodos y Propiedades

#### `__init__()`
```python
def __init__(self):
    super().__init__(Usuario)
    self.__usuario = None
```
**Descripción:** Constructor de la clase. Inicializa el adaptador DAO con la entidad `Usuario` y establece el atributo privado `__usuario` a `None`.

#### `_usuario` (Propiedad)
```python
@property
def _usuario(self):
    if self.__usuario is None:
        self.__usuario = Usuario()
    return self.__usuario

@_usuario.setter
def _usuario(self, value):
    self.__usuario = value
```
**Descripción:** Propiedad que obtiene o establece la instancia de `Usuario`. Si no hay una instancia existente, crea una nueva.

#### `_lista` (Propiedad)
```python
@property
def _lista(self):
    return self._list()
```
**Descripción:** Propiedad que devuelve la lista de usuarios utilizando el método `_list()` del adaptador DAO.

#### `save` (Propiedad)
```python
@property
def save(self):
    self.__usuario._id = self._lista._length + 1
    print("Guardando Usuario")
    self._save(self.__usuario)
```
**Descripción:** Propiedad que guarda la instancia de `Usuario` actual. Asigna un nuevo ID incrementado basado en la longitud de la lista de usuarios y llama al método `_save()` del adaptador DAO.

#### `delete(pos)` (Método)
```python
def delete(self, pos):
    self._delete(pos)
```
**Descripción:** Método que elimina un usuario en una posición específica utilizando el método `_delete()` del adaptador DAO.

#### `merge()` (Método)
```python
def merge(self):
    self._merge(self.__usuario)
```
**Descripción:** Método que fusiona la instancia actual de `Usuario` con los datos existentes utilizando el método `_merge()` del adaptador DAO.
