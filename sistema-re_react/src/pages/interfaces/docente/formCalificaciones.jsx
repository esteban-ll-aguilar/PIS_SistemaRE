import React, { useState } from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';
import CargandoBottonAnimation from '../../../components/funtions/cargandoBottonAnimation';

const FormCalificaciones = ({ idMateria, idUnidad, nUnidad }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Por favor, selecciona un archivo.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`http://127.0.0.1:5000/asignar/calificaciones/materia/${idMateria}/unidad/${idUnidad}/nunidad/${nUnidad}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const result = await response.json();
      setSuccess('Archivo cargado exitosamente.');
      enqueueSnackbar('Calificaciones cargadas exitosamente', { variant: 'success' });
      window.location.reload();
      console.log(result);
    } catch (error) {
      setError(error.message);
      enqueueSnackbar('Error al cargar las calificaciones', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center dark:text-white">
        Calificaciones Unidad {nUnidad}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-white mb-2">
            Archivo de Calificaciones:
          </label>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        {error && <p className="text-red-500 dark:text-red-400 mb-2">{error}</p>}
        {success && <p className="text-green-500 dark:text-green-400 mb-2">{success}</p>}
        <div className="flex justify-between items-center">
          <CargandoBottonAnimation loading={loading} textload="Subiendo" textunload="Subir Archivo" />
        </div>
      </form>
    </div>
  );
};

export default FormCalificaciones;
