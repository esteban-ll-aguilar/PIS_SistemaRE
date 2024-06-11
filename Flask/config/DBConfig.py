from os import environ, path
import os
from dotenv import load_dotenv

base_dir = path.abspath(path.dirname('__file__'))
load_dotenv(path.join(base_dir, 'DBConfig.env'))


class DBConnection:
    def __init__(self):
        self.__USER = environ.get('USER')
        self.__DSN = environ.get('DSN')
        self.__PASSWORD = environ.get('PASSWORD')
    
    @property
    def conectDataBase(self):
        import oracledb
        con = oracledb.connect(
            user=self.__USER, 
            password=self.__PASSWORD, 
            dsn=self.__DSN,
                               )
        #que el cursor devuelva los resultados como diccionarios
        if con.is_healthy():
            print("Healthy connection!")
            return con
        else:
            print("Unusable connection. Please check the database and network settings.")
            return None
        

