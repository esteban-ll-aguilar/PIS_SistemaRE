import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const ActivacionCuentaUser = () => {
    const { id } = useParams(); // Obtén el ID del usuario desde los parámetros de la URL
    const [user, setUser] = useState({});
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/usuario/${id}`, {
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                const data = await response.json();
                setUser(data.usuario[0]);
                console.log(data.usuario[0]);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message);
            }
        };
        fetchUser();
    }, [id]);

    const handleActivation = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await fetch('http://127.0.0.1:5000/activar-cuenta', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {email : user.user_correo}
                ), // Envía el ID del usuario para activar la cuenta
            });
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            setSuccess('Cuenta activada con éxito');
        } catch (error) {
            console.error('Error activating account:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg dark:bg-slate-700 p-4">
            <header className="text-center mb-4">
                <h1 className="text-4xl font-bold mb-2 text-gray-800 dark:text-white">Activación de cuenta</h1>
                {error && <p className="text-red-500 dark:text-red-400">Error: {error}</p>}
                {success && <p className="text-green-500 dark:text-green-400">Cuenta activada con éxito</p>}
            </header>
            <div className="flex justify-center items-center">
                <form onSubmit={handleActivation} className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full">
                    <p className="text-2xl font-semibold text-gray-700 dark:text-white mb-4 text-center">Activar cuenta de usuario</p>
                    <p className="mb-2">Bienvenido {user.user_primer_nombre} {user.user_primer_apellido} {user.user_segundo_apellido}, por favor activa tu cuenta para poder acceder a la plataforma.</p>
                    <p className="mb-6">Su contraseña temporal es: <span className="font-bold">{user.user_contrasena}</span></p>
                    <button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full w-full text-center hover:from-blue-600 hover:to-purple-600 transition-colors duration-300" disabled={loading}>
                        {loading ? 'Activando...' : 'Activar cuenta'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ActivacionCuentaUser;
