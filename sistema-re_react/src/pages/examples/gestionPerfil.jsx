import { use } from 'echarts';
import React, { useState, useEffect } from 'react';

const Profile = ({ onClose, cedula }) => {
  const [name, setName] = useState('Jose Guaman');
  const [email, setEmail] = useState('johndoe@unl.edu.ec');
  const [cycle, setCycle] = useState('Ing. en Software');
  const [avatar, setAvatar] = useState('https://via.placeholder.com/150'); // URL de imagen de ejemplo

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    console.log('Archivo seleccionado:', file);
    // Aquí podrías usar una API para subir la imagen y obtener su URL
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleCycleChange = (e) => {
    setCycle(e.target.value);
  };

  const saveChanges = () => {
    console.log('Nombre:', name);
    console.log('Correo:', email);
    console.log('Ciclo:', cycle);
    onClose(); // Cierra el modal después de guardar los cambios
  };
//Mio esteban
const [usuario, setUsuario] = useState([]);
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/usuario/${cedula}`, {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const usuario = await response.json();
      setUsuario(usuario.usuario[0]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  fetchData();
}, []);
//

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
          value={usuario.user_nombreuser}
          onChange={handleNameChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black dark:bg-gray-300"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-white">Correo</label>
        <input
          type="email"
          value={usuario.user_correo}
          onChange={handleEmailChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black dark:bg-gray-300"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-white">Contrasena</label>
        <input
          type="text"
          value={usuario.user_contrasena}
          onChange={handleCycleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black dark:bg-gray-300"
        />
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
