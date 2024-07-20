import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useSnackbar } from 'notistack';

const Profile = ({ onClose, cedula }) => {
    const [usuario, setUsuario] = useState({});
    const [avatar, setAvatar] = useState('https://via.placeholder.com/150');
    const { enqueueSnackbar } = useSnackbar();
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/usuario/${cedula}`, {
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                const data = await response.json();
                setUsuario(data.usuario[0]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [cedula]);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        console.log('Archivo seleccionado:', file);
        // Aquí podrías usar una API para subir la imagen y obtener su URL
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario(prevState => ({ ...prevState, [name]: value }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const saveChanges = async () => {
        console.log('Datos del usuario:', usuario);
        try {
            const response = await fetch('http://127.0.0.1:5000/actualizar/usuario', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuario),
            });
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            const data = await response.json();
            console.log(data);
            enqueueSnackbar('Usuario actualizado correctamente', { variant: 'success' });
            onClose(); // Cierra el modal después de guardar los cambios
        } catch (error) {
            console.error('Error updating usuario:', error);
            enqueueSnackbar('Error al actualizar usuario', { variant: 'error' });
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-lg w-full relative dark:bg-gray-600">
            <button
                onClick={onClose}
                className="absolute top-0 right-0 mt-2 mr-2 text-gray-700 hover:text-red-600 text-2xl"
            >
                &times;
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center text-black dark:text-white">Editar Perfil</h2>
            <div className="flex justify-center mb-4">
                <div className="relative">
                    <img
                        src={avatar}
                        alt="Avatar"
                        className="w-24 h-24 rounded-full object-cover"
                    />
                    <input
                        type="file"
                        onChange={handleAvatarChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                </div>
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-white">Nombre de Usuario</label>
                <input
                    type="text"
                    name="user_nombreuser"
                    value={usuario.user_nombreuser || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black dark:bg-gray-300"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-white">Correo</label>
                <input
                    type="email"
                    name="user_correo"
                    value={usuario.user_correo || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black dark:bg-gray-300"
                    readOnly={true}
                />
            </div>
            <div className="mb-4 relative">
                <label className="block text-sm font-medium text-gray-700 dark:text-white">Contraseña</label>
                <input
                    type={showPassword ? "text" : "password"}
                    name="user_contrasena"
                    value={usuario.user_contrasena || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black dark:bg-gray-300"
                />
                <div
                    className="absolute inset-y-0 pt-6 right-0 pr-4 flex items-center cursor-pointer"
                    onClick={togglePasswordVisibility}
                >
                    {showPassword ? <FaEyeSlash className="text-gray-500 size-5" /> : <FaEye className="text-gray-500 size-5" />}
                </div>
            </div>
            <button
                onClick={saveChanges}
                className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-sky-700"
            >
                Guardar Cambios
            </button>
        </div>
    );
};

export default Profile;
