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
        
