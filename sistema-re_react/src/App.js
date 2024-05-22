import React, { useState } from 'react';
import './App.css';
function App() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('http://127.0.0.1:5000/exel_docente', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    console.log(data);
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-full max-w-md">
        <input 
          type="file" 
          accept='.xlsx' 
          onChange={handleFileChange} 
          className="mb-4 border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <button 
          onClick={handleSubmit} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Enviar
        </button>
      </div>
    </div>
  );

}

export default App;
