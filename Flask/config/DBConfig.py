from os import environ, path
import os
from dotenv import load_dotenv

_BASE_DIR = path.abspath(path.dirname(path.dirname(__file__)))




class DBConnection:


    def __init__(self):
        load_dotenv(path.join(_BASE_DIR, 'config/DBConfig.env'))
        self.__USER = environ.get('USER')
        self.__PASSWORD = environ.get('PASSWORD')
        self.__DSN = environ.get('DSN')
        


    
    @property
    def connectDataBase(self):
        import oracledb
        con = oracledb.connect(
                                user=self.__USER, 
                                password=self.__PASSWORD, 
                                dsn=self.__DSN,
                                )
        
        try:
            print('Conexion exitosa')
            return con
        except Exception as e:
            print('Error: '+str(e))
            
            
    @property
    def exportDataBase(self):
        #guardar el archivo en descargas
        print('Exportando base de datos')
        #os.system(f'expdp {self.__USER}/{self.__PASSWORD}@{self.__DSN} DIRECTORY=EXPORT_DATABASE DUMPFILE=backup.dmp')
        os.system(f'expdp {self.__USER}/{self.__PASSWORD}@{self.__DSN} DIRECTORY=DATA_PUMP_DIR DUMPFILE=backup.dmp')
        #CREATE DIRECTORY my_backup_dir AS 'C:\USERS\ESTEB\ONEDRIVE\ESCRITORIO\ESTUDIOS_ESTEBAN\3-CICLO\PIS\PIS_SISTEMARE\FLASK/DATA/DATABASE/';
        #GRANT READ, WRITE ON DIRECTORY my_backup_dir TO your_user;

        # print('Exportación exitosa')
    
        
        
