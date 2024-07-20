// src/components/CombinePDFs.js
import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';

const CombinePDFs = ({ dynamicPDFBlob, userPDFBlob, secondDynamicPDFBlob }) => {
    const [combinedPdfUrl, setCombinedPdfUrl] = useState(null);

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
        a.download = 'combined.pdf';
        a.click();
    };

    return (
        <div>
            <button onClick={combine}>Combinar PDFs</button>
            {combinedPdfUrl && (
                <div>
                    <iframe src={combinedPdfUrl} width="100%" height="600px"></iframe>
                    <button onClick={download}>Descargar PDF</button>
                </div>
            )}
        </div>
    );
};

export default CombinePDFs;
