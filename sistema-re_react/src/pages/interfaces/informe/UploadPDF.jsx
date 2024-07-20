import React from 'react';

const UploadPDF = ({ onFileUpload, onClearUpload }) => {
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            onFileUpload(file);
        }
    };

    const clearFile = () => {
        onClearUpload();
        document.getElementById('pdf-upload').value = '';
    };

    return (
        <div className="flex flex-col items-center space-y-2">
            <input
                type="file"
                id="pdf-upload"
                accept="application/pdf"
                onChange={handleFileChange}
                className="mb-2"
            />
        </div>
    );
};

export default UploadPDF;
