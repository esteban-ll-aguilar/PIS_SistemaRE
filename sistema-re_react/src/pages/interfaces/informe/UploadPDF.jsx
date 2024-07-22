import React, { useState } from 'react';
import { FaUpload, FaTimes } from 'react-icons/fa';

const UploadPDF = ({ onFileUpload, onClearUpload }) => {
    const [fileName, setFileName] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            onFileUpload(file);
        }
    };

    const clearFile = () => {
        setFileName('');
        onClearUpload();
        document.getElementById('pdf-upload').value = '';
    };

    return (
        <div className="flex text-center flex-col items-center space-y-6 p-6  rounded-lg ">
            {fileName && (
                <div className="flex items-center text-center justify-between space-x-2 text-gray-700 text-sm bg-gray-200 py-2 px-4 rounded-md w-full ">
                    <span className="truncate">{fileName}</span>
                    <FaTimes
                        className="cursor-pointer text-red-500 hover:text-red-700 dark:text-red-800"
                        onClick={clearFile}
                    />
                </div>
            )}
            <label
                htmlFor="pdf-upload"
                className="cursor-pointer flex items-center space-x-2 bg-gradient-to-r 
                    from-blue-500 to-blue-600 text-white py-3 px-6 
                    rounded-full shadow-md transform transition-transform duration-200 
                    hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300
                    focus:ring-opacity-50 hover:from-blue-600 hover:to-blue-700
                    w-[200px] md:w-[250px] lg:w-[300px] xl:w-[350px] 2xl:w-[400px]
                    text-sm font-semibold
                    dark:from-blue-700 dark:to-blue-800 dark:hover:from-blue-500 dark:hover:to-blue-600
                    dark:focus:ring-blue-700
                    "
            >
                <FaUpload className="w-5 h-5" />
                <span>Subir PDF</span>
            </label>
            <input
                type="file"
                id="pdf-upload"
                accept="application/pdf"
                onChange={handleFileChange}
                className="hidden"
            />
        </div>
    );
};

export default UploadPDF;