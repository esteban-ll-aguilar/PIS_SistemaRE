import React, { useState } from 'react';
import { FaEnvelope } from 'react-icons/fa';  
import { SnackbarProvider, useSnackbar } from 'notistack';
import ReactDOMServer from 'react-dom/server';

const capitalizeFirstLetter = (text) => {
  if (!text) return ''; // Manejar el caso de texto vacío o nulo
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

const SendEmail = ({ onClose, userRemitente }) => {
  const [toEmail, setToEmail] = useState('');
  const [subject, setSubject] = useState('Rendimiento Academico');
  const [message, setMessage] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  // Mensaje predefinido en partes para usar JSX
  
  const predefinedMessage = (
    'De parte de ' + capitalizeFirstLetter(userRemitente.user_primer_nombre) + ' ' + capitalizeFirstLetter(userRemitente.user_primer_apellido) + ' ' + capitalizeFirstLetter(userRemitente.user_segundo_apellido) + '\n' +
    'Contacto: \n' + userRemitente.user_correo +
    '\nDocente de la Universidad Nacional de Loja (UNL) se comunica con usted por los siguientes motivos:\n\n'
  )
  const mensaje = `${predefinedMessage}${message}`;
  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    const templateParams = {
      recipient: toEmail,
      subject: subject,
      body: mensaje,
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(templateParams),
      });
      enqueueSnackbar('Correo enviado exitosamente', { variant: 'success' });
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      enqueueSnackbar('Error al enviar el correo', { variant: 'error' });
    } finally {
      setLoading(false);
    }

  };


  return (
    <div className="bg-white p-6 rounded-lg w-[450px]  relative dark:bg-gray-600 dark:text-white">
      <button
        onClick={onClose}
        className="absolute top-0 right-0 mt-4 mr-4 text-black size-7 hover:text-red-600 text-2xl"
      >
        <FaEnvelope />
      </button>
      <h2 className="text-2xl font-bold text-center text-black mb-4 dark:text-white">Enviar Correo</h2>
      <form onSubmit={sendEmail}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">Para:</label>
          <input
            type="email"
            value={toEmail}
            onChange={(e) => setToEmail(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black dark:bg-gray-100 dark:text-black"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">Asunto:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black dark:bg-gray-100 dark:text-black"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">Mensaje:</label>
          <div className="mb-2 border p-2 rounded-md bg-gray-100 dark:bg-gray-700">
            {predefinedMessage}
          </div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escriba su mensaje aquí..."
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black dark:bg-gray-100 dark:text-black"
            rows="5"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {loading ? 'Enviando...' : 'Enviar Correo'}
        </button>
      </form>
    </div>
  );
};

export default SendEmail;
