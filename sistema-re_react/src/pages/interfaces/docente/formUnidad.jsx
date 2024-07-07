import React from "react";
import Form from "../../../components/forms";
import {  useParams } from 'react-router-dom';


const FormUnidad = () => {
    const { id, idDocente } = useParams();
    /* campos={{
        "Nombre de la unidad": "text",
        "Descripción": "text",
        "Fecha de inicio": "date",
        "Fecha de fin": "date",
        "Archivo": "file"
    }} */
    return (
   
            <div>
                <div className = 'bg-[#529914] inline text-white m-8 px-8 py-4 absolute rounded-full'>
                    <button onClick={() => window.location.href = `/interfaz/docente/${idDocente}`}>Regresar</button>
                </div>
                <Form
                    campos={{
                        "Nombre de la unidad": "text",
                        "Numero de Unidad": "number",
                    }}
                    names={["Unidad", "nUnidad"]}
                    title={"Crear Unidad"}
                    contentType="application/json"
                    id={id}
                    link={`http://127.0.0.1:5000/materia/crear/unidad/`+ id}
                    redirect={"/estudiantes/materia/" + id}
                    
                />
            </div>
    );
    }

export default FormUnidad;