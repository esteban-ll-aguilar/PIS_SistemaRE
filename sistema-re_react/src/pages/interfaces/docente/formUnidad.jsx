import React from "react";
import Form from "../../../components/forms";
import {  useParams } from 'react-router-dom';

const FormUnidad = () => {
    const { id } = useParams();
    /* campos={{
        "Nombre de la unidad": "text",
        "Descripción": "text",
        "Fecha de inicio": "date",
        "Fecha de fin": "date",
        "Archivo": "file"
    }} */
    return (
        <div>
            <Form
                campos={{
                    "Nombre de la unidad": "text",
                    "Numero de Unidad": "number",
                }}
                names={["Unidad", "nUnidad"]}
                id={id}
                link={`http://127.0.0.1:5000/materia/crear/unidad/`+ id}
                redirect={"/estudiantes/materia/" + id}
            />
        </div>
    );
    }

export default FormUnidad;