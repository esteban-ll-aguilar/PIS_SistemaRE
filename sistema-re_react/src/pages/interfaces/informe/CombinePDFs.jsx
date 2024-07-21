import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';

function CombinePDFs({ dynamicPDFBlob, userPDF, secondDynamicPDFBlob }) {
    const [combinedPdfUrl, setCombinedPdfUrl] = useState(null);
    const [showPdf, setShowPdf] = useState(false);

    const combine = async () => {
        if (!dynamicPDFBlob || !userPDF || !secondDynamicPDFBlob) return;

        const pdfDoc = await PDFDocument.create();
        const dynamicPDF = await PDFDocument.load(await dynamicPDFBlob.arrayBuffer());
        const userPDFDoc = await PDFDocument.load(await userPDF.arrayBuffer());
        const secondDynamicPDF = await PDFDocument.load(await secondDynamicPDFBlob.arrayBuffer());

        const dynamicPages = await pdfDoc.copyPages(dynamicPDF, dynamicPDF.getPageIndices());
        dynamicPages.forEach(page => pdfDoc.addPage(page));

        const userPages = await pdfDoc.copyPages(userPDFDoc, userPDFDoc.getPageIndices());
        userPages.forEach(page => pdfDoc.addPage(page));

        const secondDynamicPages = await pdfDoc.copyPages(secondDynamicPDF, secondDynamicPDF.getPageIndices());
        secondDynamicPages.forEach(page => pdfDoc.addPage(page));

        const combinedPdfBytes = await pdfDoc.save();
        const combinedPdfBlob = new Blob([combinedPdfBytes], { type: 'application/pdf' });
        const combinedPdfUrl = URL.createObjectURL(combinedPdfBlob);
        setCombinedPdfUrl(combinedPdfUrl);
    };

    const download = () => {
        if (combinedPdfUrl) {
            const a = document.createElement('a');
            a.href = combinedPdfUrl;
            a.download = 'combined.pdf';
            a.click();
        }
    };

    const toggleShowPdf = () => {
        setShowPdf(!showPdf);
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            <button onClick={combine} className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700">
                Obtener Informe
            </button>
            {combinedPdfUrl && (
                <>
                    <button onClick={toggleShowPdf} className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700">
                        {showPdf ? 'Ocultar Informe Completo' : 'Mostrar Informe Completo'}
                    </button>
                    <button onClick={download} className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700">
                        Descargar Informe de Desempeño Estudiantil
                    </button>
                    {showPdf && (
                        <iframe src={combinedPdfUrl} className="w-full h-96 border-2 border-gray-300 mt-4"></iframe>
                    )}
                </>
            )}
        </div>
    );
}

export default CombinePDFs;
