from typing import TypeVar, Generic, Type
from config.DBConfig import DBConnection
from controls.tda.linked.linkedList import Linked_List
from datetime import datetime
import os, json
import oracledb
T = TypeVar("T")

class DaoAdapter(Generic[T]):
    atype: T
    def __init__(self, atype: T):
        self.atype = atype
        self.__name = atype.__name__.upper() 
        self.__connection = DBConnection().connectDataBase
        self.lista = Linked_List()

    
    
    def _list(self) -> T:
        self.lista.clear
        columns, rows = self.obtainColumsRows()
        #print(rows)
        
        for i in rows:
            self.lista.__addLast__(self.atype().deserialize(i))
        return self.lista
    
    # usuario.user_iduser,funciondocente.idfunciondocente, usuario.user_nombres, usuario.user_apellidos, \
                    #      usuario.user_correo,funciondocente.descripcion
    def obtainColumsRows(self):
        cur = self.__connection.cursor()
        print(self.__name)
        if self.__name == 'ESTUDIANTE':
            cur.execute("SELECT * FROM USUARIO JOIN "+ self.__name + " ON usuario.user_cedula = estudiante.user_cedula")
        elif self.__name == 'DOCENTE':
            cur.execute("SELECT * FROM USUARIO JOIN "+ self.__name + " ON usuario.user_cedula = docente.user_cedula")
             
        elif self.__name == 'FUNCIONDOCENTE':
            cur.execute("SELECT * FROM USUARIO JOIN "+ self.__name + " ON usuario.user_cedula = funciondocente.docente_user_cedula")
        else:
            cur.execute("SELECT * FROM "+ self.__name)
        columns = [col[0].lower() for col in cur.description]
        rows = [dict(zip(columns, row)) for row in cur.fetchall()]
        cur.close()
        return columns, rows
    
    def obtainColums(self):
        cur = self.__connection.cursor()
        cur.execute("SELECT * FROM "+ self.__name)
        columns = [col[0].lower() for col in cur.description]
        cur.close()
        return columns
    
    def __transform__(self):
        print(self.lista._length)
        aux = '['
        for i in range(0, self.lista._length):
            if i < self.lista._length -1:
                aux += str(json.dumps(self.lista.get(i).serializable)) + ','
            else:
                aux += str(json.dumps(self.lista.get(i).serializable))
        aux += ']'
        return aux
                
    def to_dict(self):
        aux = []
        self._list()
        for i in range(0, self.lista._length):
            aux.append(self.lista.get(i).serializable)
        return aux

    def to_dict_list(self):
        array = []
        lista = self.lista.toArray
        for i in range(0, self.lista._length):
            array.append(lista[i].serializable)
        return array
            
    def date_valid(self,fecha_str, formato):
        try:
            datetime.strptime(fecha_str, formato)
            return True
        except ValueError:
            return False
        
        
    def _save(self, data: T) -> T:
        self._list()
        self.lista.add(data, self.lista._length)
        
        datos = data.serializable
        print(datos)
        columns = self.obtainColums()
        columns = tuple(columns).__str__().replace("'", "")
        dataclass = ''
        for cont in datos:
            if isinstance(datos[cont], str):
                if self.date_valid(datos[cont], '%d-%m-%Y'):
                    dataclass += "TO_DATE('"+datos[cont]+"', 'DD-MM-YYYY')"+','
                else:
                    dataclass += "'"+str(datos[cont])+"'"+','
            else:
                dataclass += str(datos[cont])+','
        dataclass = dataclass[:-1]
        
        
        sql = "INSERT INTO "+self.__name+" "+columns+" \
        VALUES ("+dataclass+")"
        print(sql)
        
        self.__connection.cursor().execute(sql)
        self.__connection.commit()
        print("Guardado")



    def _delete(self, data: T) -> T:
    
        dataclass = ''
        columns= self.obtainColums()
        i = 0
        for cont in (data):
            if isinstance(data[cont], str):
                if self.date_valid(data[cont], '%d-%m-%Y'):
                    dataclass += columns[i]+ "= TO_DATE('"+data[cont]+"', 'DD-MM-YYYY')"+' AND '
                else:
                    dataclass += columns[i]+"= '"+str(data[cont])+"'"+' AND '
            else:
                dataclass += columns[i] + "= " + str(data[cont])+' AND '
            i += 1
            
        dataclass = dataclass[:-5]
        sql = "DELETE FROM "+self.__name+" WHERE " + dataclass
        print(sql)
        
        self.__connection.cursor().execute(sql)
        self.__connection.commit()
        print("Eliminado")


    def _merge(self, data: T) -> T:
        dataclass = ''
        columns= self.obtainColums()
        i = 0
        for cont in (data.serializable):
            if isinstance(data.serializable[cont], str):
                if self.date_valid(data.serializable[cont], '%d-%m-%Y'):
                    dataclass += columns[i]+ " = TO_DATE('"+data.serializable[cont]+"', 'DD-MM-YYYY')"+','
                else:
                    dataclass += columns[i]+" = '"+str(data.serializable[cont])+"'"+','
            else:
                dataclass += columns[i] + " = " + str(data.serializable[cont])+','
            i += 1
            
        dataclass = dataclass[:-1] 
        sql = "UPDATE "+self.__name+" SET " + dataclass + " WHERE " + columns[0] + " = " + str(data.serializable[columns[0]])
        print(sql)
        
        self.__connection.cursor().execute(sql)
        self.__connection.commit()
        print("Actualizado")