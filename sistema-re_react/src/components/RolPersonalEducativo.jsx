import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardTeacher, faUserTie, faUserCog } from '@fortawesome/free-solid-svg-icons';
import Cargando from "../components/funtions/cargando";


const RolPersonalEducativo = ({ cedula }) => {
    const [funciones, setFunciones] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchFuncionDocente = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/ver/funciones_docente/${cedula}`, {
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                const data = await response.json();
                setFunciones(data.funciones);
                console.log(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchFuncionDocente();
    }, [cedula]);

    const getIcon = (descripcion) => {
        switch (descripcion) {
            case 'DOCENTE':
                return <FontAwesomeIcon icon={faChalkboardTeacher} className="text-blue-500" />;
            case 'PERSONAL_SEGUIMIENTO':
                return <FontAwesomeIcon icon={faUserTie} className="text-green-500" />;
            case 'ADMINISTRADOR':
                return <FontAwesomeIcon icon={faUserCog} className="text-red-500" />;
            default:
                return null;
        }
    };

    const getLink = (descripcion) => {
        switch (descripcion) {
            case 'DOCENTE':
                return `/interfaz/docente/${cedula}`;
            case 'PERSONAL_SEGUIMIENTO':
                return `/interfaz/responsable/${cedula}`;
            case 'ADMINISTRADOR':
                return `/interfaz/admin/${cedula}`;
            default:
                return '#';
        }
    };

    return (
    <> 
      {loading ? (
        <Cargando />
      ) : (   
        <div className="flex flex-col items-center space-y-6 p-6">
            {funciones.map((funcion, index) => (
                <div key={index} className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md hover:shadow-2xl transition-shadow duration-300">
                    <div className="text-4xl mb-4 text-center">
                        {getIcon(funcion.descripcion)}
                    </div>
                    <p className="text-xl font-semibold text-[#04344c] dark:text-white mb-4 text-center">
                        {funcion.descripcion}
                    </p>
                    <div className="text-center">
                        <a href={getLink(funcion.descripcion)} className="inline-block bg-[#529914] dark:bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-[#3C6E10] transition-colors duration-300">
                            Ir a Interfaz
                        </a>
                    </div>
                </div>
            ))}
            
        </div>
        )}
     </>
    );
};

export default RolPersonalEducativo;
