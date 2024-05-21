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
    <div className="App">
      <input type="file" accept='.xlsx' onChange={handleFileChange} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );

}

export default App;
