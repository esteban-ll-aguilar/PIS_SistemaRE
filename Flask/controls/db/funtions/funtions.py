from config.DBConfig import DBConnection
import oracledb, json
class FuntionsDB:
    def __init__(self) -> None:
        self.__con = DBConnection().connectDataBase
        self.__cur = self.__con.cursor()
        
    def obtener_promedio_materia_json(self,id_materia, id_unidad):

        # Llama a la función PL/SQL y obtiene un cursor ref
        result_cursor = self.__cur.callfunc('obtener_promedio_materia', oracledb.CURSOR, [id_materia, id_unidad])

        # Obtiene los resultados
        results = result_cursor.fetchall()

        # Convierte los resultados a una lista de diccionarios
        columns = [col[0].lower() for col in result_cursor.description]
        results_dict = [dict(zip(columns, row)) for row in results]

        # Convierte a JSON
        results_json = results_dict#json.dumps(results_dict, indent=4)

        self.__cur.close()
        return results_json