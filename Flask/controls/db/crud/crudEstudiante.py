from config.DBConfig import DBConnection
from datetime import datetime
class CrudEstudiante:
    def __init__(self) -> None:
        self.__con = DBConnection().connectDataBase
        self.__cur = self.__con.cursor()
        
    def createEstudiante(self, idEstudiante, cedula, becaEconomica, fechaNacimiento):
        fechaNacimiento = datetime.strptime(fechaNacimiento, '%d-%m-%Y')
        try:
            self.__cur.callproc('CRUD_ESTUDIANTE', ['INSERT',idEstudiante, cedula, becaEconomica, fechaNacimiento])
            self.__con.commit()
            print('Estudiante creado')
        except Exception as e:
            print('Error: '+str(e))
            
    def deleteEstudiante(self, idEstudiante, cedula, becaEconomica, fechaNacimiento):
        fechaNacimiento = datetime.strptime(fechaNacimiento, '%d-%m-%Y')
        try:
            self.__cur.callproc('CRUD_ESTUDIANTE',['DELETE',idEstudiante, cedula, becaEconomica, fechaNacimiento])
            self.__con.commit()
            print('Estudiante eliminado')
        except Exception as e:
            print('Error: '+str(e))
            
    def updateEstudiante(self, idEstudiante, cedula, becaEconomica, fechaNacimiento):
        fechaNacimiento = datetime.strptime(fechaNacimiento, '%d-%m-%Y')
        try:
            self.__cur.callproc('CRUD_ESTUDIANTE',['UPDATE',idEstudiante, cedula, becaEconomica, fechaNacimiento])
            self.__con.commit()
            print('Estudiante actualizado')
        except Exception as e:
            print('Error: '+str(e))
    