// src/components/CombinePDFs.js
import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';

const CombinePDFs = ({ dynamicPDFBlob, userPDFBlob, secondDynamicPDFBlob }) => {
    const [combinedPdfUrl, setCombinedPdfUrl] = useState(null);
    const [showPdf, setShowPdf] = useState(false);

    const show = () => {
        setShowPdf(true);
    }

    const unshow = () => {  
        setShowPdf(false);
    }

    const combine = async () => {
        const pdfDoc = await PDFDocument.create();

        const dynamicPDF = await PDFDocument.load(await dynamicPDFBlob.arrayBuffer());
        const userPDF = await PDFDocument.load(await userPDFBlob.arrayBuffer());
        const secondDynamicPDF = await PDFDocument.load(await secondDynamicPDFBlob.arrayBuffer());

        const dynamicPages = await pdfDoc.copyPages(dynamicPDF, dynamicPDF.getPageIndices());
        dynamicPages.forEach(page => pdfDoc.addPage(page));

        const userPages = await pdfDoc.copyPages(userPDF, userPDF.getPageIndices());
        userPages.forEach(page => pdfDoc.addPage(page));

        const secondDynamicPages = await pdfDoc.copyPages(secondDynamicPDF, secondDynamicPDF.getPageIndices());
        secondDynamicPages.forEach(page => pdfDoc.addPage(page));

        const combinedPdfBytes = await pdfDoc.save();
        const combinedPdfBlob = new Blob([combinedPdfBytes], { type: 'application/pdf' });
        const combinedPdfUrl = URL.createObjectURL(combinedPdfBlob);
        setCombinedPdfUrl(combinedPdfUrl);
    };

    const download = () => {
        const a = document.createElement('a');
        a.href = combinedPdfUrl;
        a.download = 'Informe de desempeño estudiantil.pdf';
        a.click();
    };

    return (
        <div className='text-center'>
            <button onClick={combine}
                className={`px-4 py-2 dark:bg-green-900 dark:text-white rounded shadow ${userPDFBlob ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}

            >Obtener  Informe</button>
            {combinedPdfUrl && (
                <section className='flex flex-col items-center space-y-4'>
                <div  className=''>
                             
                    {showPdf ? true &&(
                        <button 
                            className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 dark:bg-blue-800  dark:text-white "
                            onClick={unshow}
                        >
                            Ocultar Informe 
                        </button>
                    ) : (
                        <button 
                            className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 dark:bg-blue-800  dark:text-white "
                            onClick={show}
                        >
                            Mostra Informe 
                        </button>
                    )

                    }
                    <button 
                        className="px-4 py-2 m-4 bg-red-600 text-white rounded shadow hover:bg-blue-700 dark:bg-red-800  dark:text-white "
                        onClick={download}
                    >
                        Descargar Informe 
                    </button>  
                    {/* <iframe src={combinedPdfUrl} 
                    className=' h-[300px] sm:h-[400px] md:w-[700px] md:h-[500px] lg:w-[800px] lg:h-[600px] xl:w-[900px] xl:h-[700px] 2xl:w-[1000px] 2xl:h-[800px] sm:w-[600px] '
                    ></iframe> */}
                    {showPdf && <iframe src={combinedPdfUrl} 
                    className=' h-[300px] sm:h-[400px] md:w-[700px] md:h-[500px] lg:w-[200px] lg:h-[600px] xl:w-[200px] xl:h-[700px] 2xl:w-[1000px] 2xl:h-[800px] sm:w-[600px] '
                    ></iframe>}

                    
                </div>
                </section>
            )}
        </div>
    );
};

export default CombinePDFs;
