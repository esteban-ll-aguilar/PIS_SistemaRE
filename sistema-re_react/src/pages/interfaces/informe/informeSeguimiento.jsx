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
        <div className="min-h-screen bg-gray-100 dark:bg-slate-800 dark:text-white flex items-center justify-center">
            <div className="w-full max-w-4xl py-10 px-32	 bg-white dark:bg-slate-900 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center dark:text-white mb-4">
                    Informe de desempeño estudiantil
                </h1>
                <p className="text-center text-lg dark:text-gray-300 mb-6">
                    Aquí podrás subir el plan de retroalimentación que se realizo a los estudiantes con bajo rendimiento el cual se adjutara con el informe de desmpeño estudiantil para obtener el informe completo.<br/> 
                    Primero, sube un el archivo PDF, luego haga click en el boton obtener infome y podra visualizar el informe completo y descargarlo.
                </p>
                <div className="flex flex-col items-center space-y-4">
                    <UploadPDF onFileUpload={setUserPDF} onClearUpload={clearUserPDF} />
                    
                    {userPDF && dynamicPDFBlob && secondDynamicPDFBlob && (
                        <CombinePDFs
                            dynamicPDFBlob={dynamicPDFBlob}
                            userPDFBlob={userPDF}
                            secondDynamicPDFBlob={secondDynamicPDFBlob}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default InformeSeguimiento;
