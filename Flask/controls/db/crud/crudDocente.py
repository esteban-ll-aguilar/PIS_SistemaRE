from config.DBConfig import DBConnection
class CrudDocente:
    def __init__(self) -> None:
        self.__con = DBConnection().connectDataBase
        self.__cur = self.__con.cursor()
        
    def createDocente(self,idDocente, cedula, cubiculo, experiencia):
        try:
            self.__cur.callproc('CRUD_DOCENTE', ['INSERT',idDocente, cedula,cubiculo, experiencia])
            self.__con.commit()
            print('Docente creado')
        except Exception as e:
            print('Error: '+str(e))
            
    def deleteDocente(self,idDocente, cedula, cubiculo, experiencia):
        try:
            self.__cur.callproc('CRUD_DOCENTE',['DELETE',idDocente, cedula, cubiculo, experiencia])
            self.__con.commit()
            print('Docente eliminado')
        except Exception as e:
            print('Error: '+str(e))
            
    def updateDocente(self, idDocente, cedula, cubiculo, experiencia):
        try:
            self.__cur.callproc('CRUD_DOCENTE',['UPDATE',idDocente, cedula, cubiculo, experiencia])
            self.__con.commit()
            print('Docente actualizado')
        except Exception as e:
            print('Error: '+str(e))