from config.DBConfig import DBConnection
class CrudCursa:
    def __init__(self) -> None:
        self.__con = DBConnection().connectDataBase
        self.__cur = self.__con.cursor()
        
        
    def createCursa(self, idCursa,estudianteCedula, 
                    materiaId, paralelo, docenteCedula, periodoAcademicoId):
        try:
            self.__cur.callproc('CRUD_CURSA', ['INSERT',idCursa,estudianteCedula, 
                                                    materiaId, paralelo, 
                                                    docenteCedula, periodoAcademicoId])
            self.__con.commit()
            print('Cursa creada')
        except Exception as e:
            print('Error: '+str(e))
            
    def deleteCursa(self, idCursa,estudianteCedula, 
                    materiaId, paralelo, docenteCedula, periodoAcademicoId):
        try:
            self.__cur.callproc('CRUD_CURSA',['DELETE',idCursa,estudianteCedula, 
                                                    materiaId, paralelo, 
                                                    docenteCedula, periodoAcademicoId])
            self.__con.commit()
            print('Cursa eliminada')
        except Exception as e:
            print('Error: '+str(e))
            
    def updateCursa(self, idCursa, estudianteCedula, 
                    materiaId, paralelo, docenteCedula, periodoAcademicoId):
        try:
            self.__cur.callproc('CRUD_CURSA',['UPDATE',idCursa, estudianteCedula, 
                                                    materiaId, paralelo, 
                                                    docenteCedula, periodoAcademicoId])
            self.__con.commit()
            print('Cursa actualizada')
        except Exception as e:
            print('Error: '+str(e))