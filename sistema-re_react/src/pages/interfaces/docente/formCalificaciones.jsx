import React from "react";
import Form from "../../../components/forms";
import {  useParams } from 'react-router-dom';

const FormCalificaciones = ({idMateria, idUnidad, nUnidad}) => {
    return (
        <div>
            <Form
                campos={{
                    "Archivo de Calificaciones": "file",
                }}
                title={"Calificaciones Unidad " + idUnidad}
                names={["file"]}
                contentType="multipart/form-data"
                link={`http://127.0.0.1:5000/asignar/calificaciones/materia/${idMateria}/unidad/${idUnidad}/nunidad/${nUnidad}`}
                redirect={"/estudiantes/calificaciones/materia/" + idMateria + "/unidad/" + idUnidad}
            />
        </div>
    );
    }

export default FormCalificaciones;