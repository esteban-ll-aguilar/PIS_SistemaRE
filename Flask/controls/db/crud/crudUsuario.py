from config.DBConfig import DBConnection
class CrudUsuario:
    def __init__(self) -> None:
        self.__con = DBConnection().connectDataBase
        self.__cur = self.__con.cursor()
        
    def createUsuario(self, idUsuario,cedula,
                        primerNombre, segundoNombre,
                        primerApellido, segundoApellido,
                        correo, contrasena, estado, urlImagen, nombreUsuario):
            try:
                self.__cur.callproc('CRUD_USUARIO', ['INSERT',idUsuario, cedula,
                        primerNombre, segundoNombre,
                        primerApellido, segundoApellido,
                        correo, contrasena, estado, urlImagen, nombreUsuario])
                self.__con.commit()
                print('Usuario creado')
            except Exception as e:
                print('Error: '+str(e))
                
    
    def deleteUsuario(self, idUsuario,cedula,
                        primerNombre, segundoNombre,
                        primerApellido, segundoApellido,
                        correo, contrasena, estado, urlImagen, nombreUsuario):
        try:
            self.__cur.callproc('CRUD_USUARIO',['DELETE',idUsuario,cedula,
                        primerNombre, segundoNombre,
                        primerApellido, segundoApellido,
                        correo, contrasena, estado, urlImagen, nombreUsuario])
            self.__con.commit()
            print('Usuario eliminado')
        except Exception as e:
            print('Error: '+str(e))
            
    def updateUsuario(self, idUsuario,cedula,
                        primerNombre, segundoNombre,
                        primerApellido, segundoApellido,
                        correo, contrasena, estado, urlImagen, nombreUsuario):
        try:
            self.__cur.callproc('CRUD_USUARIO',['UPDATE',idUsuario,cedula,
                        primerNombre, segundoNombre,
                        primerApellido, segundoApellido,
                        correo, contrasena, estado, urlImagen, nombreUsuario])
            self.__con.commit()
            print('Usuario actualizado')
        except Exception as e:
            print('Error: '+str(e))
            
    