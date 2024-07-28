from config.DBConfig import DBConnection
class CrudCalificacion:
    def __init__(self) -> None:
        self.__con = DBConnection().connectDataBase
        self.__cur = self.__con.cursor()
        
    #VALOR
# RUBRICACF_IDRCAL
# UNIDAD_IDUNIDAD
# CURSA_IDCURSA
    def createCalificacion(self, valor, rubricaId, unidadId, cursaId):
        try:
            self.__cur.callproc('CRUD_INSERT_CALIFICACION', [valor, rubricaId, unidadId, cursaId])
            self.__con.commit()
            print('Calificacion creada')
        except Exception as e:
            print('Error: '+str(e))
            
    def deleteCalificacion(self, idCalificacion, valor, rubricaId, unidadId, cursaId):
        try:
            self.__cur.callproc('CRUD_DELETE_CALIFICACION',[self, idCalificacion, valor, rubricaId, unidadId, cursaId])
            self.__con.commit()
            print('Calificacion eliminada')
        except Exception as e:
            print('Error: '+str(e))
            
    def updateCalificacion(self, idCalificacion, valor, rubricaId, unidadId, cursaId):
        try:
            self.__cur.callproc('CRUD_UPDATE_CALIFICACION',[idCalificacion, valor, rubricaId, unidadId, cursaId])
            self.__con.commit()
            print('Calificacion actualizada')
        except Exception as e:
            print('Error: '+str(e))