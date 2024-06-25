import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const SendEmail = ({ onClose }) => {
  const [fromEmail, setFromEmail] = useState('');
  const [toEmail, setToEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();

    const templateParams = {
      from_email: fromEmail,
      to_email: toEmail,
      subject: subject,
      message: message,
    };

    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_USER_ID')
      .then((response) => {
        setStatus('Correo enviado exitosamente!');
        console.log('SUCCESS!', response.status, response.text);
      }, (error) => {
        setStatus('Error al enviar el correo.');
        console.log('FAILED...', error);
      });
  };

  return (
    <div className="bg-white p-6 rounded-lg max-w-lg w-full relative dark:bg-gray-600 dark:text-white">
      <button
        onClick={onClose}
        className="absolute top-0 right-0 mt-4 mr-4 text-gray-700 hover:text-red-600 text-2xl"
      >
        &times;
      </button>
      <h2 className="text-2xl font-bold text-center text-black mb-4 dark:text-white">Enviar Correo</h2>
      <form onSubmit={sendEmail}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">De:</label>
          <input
            type="email"
            value={fromEmail}
            onChange={(e) => setFromEmail(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black dark:bg-gray-100 dark:text-black"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">Para:</label>
          <input
            type="email"
            value={toEmail}
            onChange={(e) => setToEmail(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black dark:bg-gray-100 dark:text-black "
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
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black dark:bg-gray-100 dark:text-black"
            rows="5"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Enviar
        </button>
      </form>
      {status && <p className="mt-4 text-center text-sm text-green-500">{status}</p>}
    </div>
  );
};

export default SendEmail;
