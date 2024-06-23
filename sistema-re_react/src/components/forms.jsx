import React, { useState } from 'react';
import axios from 'axios';

const Form = ({ campos, names, link, redirect, title, contentType }) => {
    const [formValues, setFormValues] = useState(() => {
        const initialFormValues = {};
        names.forEach((name) => {
            initialFormValues[name] = '';
        });
        return initialFormValues;
    });
    const [errors, setErrors] = useState({});
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            const formData = new FormData();
            formData.append('file', file);

            // Agregar otros campos al FormData
            names.forEach((name) => {
                formData.append(name, formValues[name]);
            });

            try {
                const response = await axios.post(link, formData, {
                    headers: {
                        'Content-Type': {contentType},
                    },
                });

                if (response.status === 200) {
                    alert("Elemento creado exitosamente");
                    window.location.href = redirect;
                } else {
                    alert("Error al enviar el formulario o el Elemento ya existe");
                }
            } catch (error) {
                alert(error);
            }
        }
    };

    const handleChange = (event, name) => {
        let newValue = event.target.value;
        if (campos[name] === 'number') {
            newValue = parseInt(newValue, 10); // o parseFloat según tus necesidades
        }
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: newValue,
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;
        Object.entries(campos).forEach(([nombreCampo, tipoCampo], index) => {
            const value = formValues[names[index]];
            switch (tipoCampo) {
                case 'text':
                    if (value.trim().length < 3) {
                        newErrors[names[index]] = `El campo ${nombreCampo} debe tener al menos 3 caracteres`;
                        isValid = false;
                    }
                    break;
                case 'number':
                    if (isNaN(value) || value <= 0) {
                        newErrors[names[index]] = `El campo ${nombreCampo} debe ser un número válido y mayor que uno`;
                        isValid = false;
                    }
                    break;
                case 'email':
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(value)) {
                        newErrors[names[index]] = `El campo ${nombreCampo} debe ser un correo electrónico válido`;
                        isValid = false;
                    }
                    break;
                case 'date':
                    const datePattern = /^\d{2}-\d{2}-\d{4}$/;
                    if (!datePattern.test(value)) {
                        newErrors[names[index]] = `El campo ${nombreCampo} debe tener el formato DD-M-AA`;
                        isValid = false;
                    }
                    break;
                case 'file':
                    if (!file) {
                        newErrors[names[index]] = `Debe seleccionar un archivo`;
                        isValid = false;
                    }
                    break;
                default:
                    break;
            }
        });
        setErrors(newErrors);
        return isValid;
    };

    return (
        <section className="p-4 mx-auto flex justify-center items-center h-full ">
            <div className="text-center border border-gray-300 rounded-lg p-6 m-7">
                <h2 className="text-2xl font-bold mb-4">{title}</h2>
                <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 ">
                    {Object.entries(campos).map(([nombreCampo, tipoCampo], index) => (
                        <div key={index} className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                {nombreCampo}
                                {tipoCampo === 'file' ? (
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                                    />
                                ) : tipoCampo === 'number' ? (
                                    <input
                                        type="number"
                                        value={formValues[names[index]]}
                                        onChange={(e) => handleChange(e, names[index])}
                                        min={0}
                                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                                    />
                                ) : (
                                    <input
                                        type={tipoCampo}
                                        value={formValues[names[index]]}
                                        onChange={(e) => handleChange(e, names[index])}
                                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                                    />
                                )}
                            </label>
                            {errors[names[index]] && <div className="text-red-500 text-xs">{errors[names[index]]}</div>}
                        </div>
                    ))}
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Enviar
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Form;
