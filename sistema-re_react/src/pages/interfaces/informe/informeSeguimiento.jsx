import React, { useState, useEffect } from 'react';
import { PDFDownloadLink, pdf } from '@react-pdf/renderer';
import DynamicPDF from './DynamicPDF';
import SecondDynamicPDF from './SecondDynamicPDF';
import UploadPDF from './UploadPDF';
import CombinePDFs from './CombinePDFs';

function InformeSeguimiento() {
    const [userPDF, setUserPDF] = useState(null);
    const [dynamicPDFBlob, setDynamicPDFBlob] = useState(null);
    const [secondDynamicPDFBlob, setSecondDynamicPDFBlob] = useState(null);

    useEffect(() => {
        const generateDynamicPDFs = async () => {
            const dynamicPDFBlob = await pdf(<DynamicPDF />).toBlob();
            setDynamicPDFBlob(dynamicPDFBlob);

            const secondDynamicPDFBlob = await pdf(<SecondDynamicPDF />).toBlob();
            setSecondDynamicPDFBlob(secondDynamicPDFBlob);
        };

        generateDynamicPDFs();
    }, []);

    const clearUserPDF = () => {
        setUserPDF(null);
    };

    return (
        <div className="flex flex-col h-full w-full p-6 space-y-6 bg-gray-100">
            <h1 className="text-3xl font-bold text-center">Combinar PDF Dinámico y PDF Subido</h1>
            <div className="flex justify-center">
                <PDFDownloadLink document={<DynamicPDF />} fileName="dynamic.pdf">
                    {({ loading }) => (
                        <button className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700">
                            {loading ? 'Generando PDF...' : 'Descargar PDF Dinámico'}
                        </button>
                    )}
                </PDFDownloadLink>
            </div>
            <div className="flex flex-col items-center space-y-4">
                <UploadPDF onFileUpload={setUserPDF} onClearUpload={clearUserPDF} />
                <button
                    onClick={clearUserPDF}
                    disabled={!userPDF}
                    className={`px-4 py-2 rounded shadow ${userPDF ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
                >
                    Limpiar PDF Subido
                </button>
                <button
                    disabled={!userPDF}
                    className={`px-4 py-2 rounded shadow ${userPDF ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
                >
                    Combinar PDFs
                </button>
                {userPDF && dynamicPDFBlob && secondDynamicPDFBlob && (
                    <CombinePDFs
                        dynamicPDFBlob={dynamicPDFBlob}
                        userPDFBlob={userPDF}
                        secondDynamicPDFBlob={secondDynamicPDFBlob}
                    />
                )}
            </div>
        </div>
    );
}

export default InformeSeguimiento;
