import React, { useState, useEffect, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';
import { pdf } from '@react-pdf/renderer';
import SignatureCanvas from 'react-signature-canvas';
import DynamicPDF from './DynamicPDF';
import SecondDynamicPDF from './SecondDynamicPDF';
import UploadPDF from './UploadPDF';
import CombinePDFs from './CombinePDFs';

function InformeSeguimiento() {
    const [userPDF, setUserPDF] = useState(null);
    const [dynamicPDFBlob, setDynamicPDFBlob] = useState(null);
    const [secondDynamicPDFBlob, setSecondDynamicPDFBlob] = useState(null);
    const [signedPdfBlob, setSignedPdfBlob] = useState(null);
    const [showPdf, setShowPdf] = useState(false);
    const [signing, setSigning] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [currentSignature, setCurrentSignature] = useState(1);
    const sigCanvas = useRef(null);
    const [combinedPdfUrl, setCombinedPdfUrl] = useState(null);

    useEffect(() => {
        const generateDynamicPDFs = async () => {
            const dynamicPDFBlob = await pdf(<DynamicPDF />).toBlob();
            setDynamicPDFBlob(dynamicPDFBlob);

            const secondDynamicPDFBlob = await pdf(<SecondDynamicPDF />).toBlob();
            setSecondDynamicPDFBlob(secondDynamicPDFBlob);
        };

        generateDynamicPDFs();
    }, []);

    const clearAll = () => {
        setUserPDF(null);
        setDynamicPDFBlob(null);
        setSecondDynamicPDFBlob(null);
        setSignedPdfBlob(null);
        setCombinedPdfUrl(null);
        setShowPdf(false);
        setSigning(false);
        setUploadingImage(false);
        setCurrentSignature(1);
    };

    const startSigning = (signatureNumber) => {
        setSigning(true);
        setUploadingImage(false);
        setCurrentSignature(signatureNumber);
    };

    const startUploadingImage = (signatureNumber) => {
        setUploadingImage(true);
        setSigning(false);
        setCurrentSignature(signatureNumber);
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const imageDataUrl = reader.result;
                await finishSigning(imageDataUrl);
            };
            reader.readAsDataURL(file);
        }
    };

    const finishSigning = async (signatureDataUrl) => {
        if (!userPDF) return;

        const pdfDoc = await PDFDocument.load(await userPDF.arrayBuffer());
        const pages = pdfDoc.getPages();
        const firstPage = pages[0]; // Adjust if needed

        let signatureImage;
        if (signatureDataUrl.startsWith('data:image/png')) {
            signatureImage = await pdfDoc.embedPng(signatureDataUrl);
        } else if (signatureDataUrl.startsWith('data:image/jpeg')) {
            signatureImage = await pdfDoc.embedJpg(signatureDataUrl);
        } else {
            console.error('Invalid image format');
            return;
        }

        // Adjust these coordinates as needed
        const positions = [
            { x: 383, y: 255, width: 110, height: 70 }, // Signature 1
            { x: 383, y: 313, width: 110, height: 70 }  // Signature 2
        ];

        const pos = positions[currentSignature - 1];

        firstPage.drawImage(signatureImage, {
            x: pos.x,
            y: firstPage.getHeight() - pos.y - pos.height,
            width: pos.width,
            height: pos.height,
        });

        const signedPdfBytes = await pdfDoc.save();
        const signedPdfBlob = new Blob([signedPdfBytes], { type: 'application/pdf' });
        setSignedPdfBlob(signedPdfBlob);
        setSigning(false);
        setUploadingImage(false);
    };

    const finishCanvasSigning = async () => {
        const signatureDataUrl = sigCanvas.current.toDataURL();
        await finishSigning(signatureDataUrl);
    };

    const combine = async () => {
        if (!signedPdfBlob || !dynamicPDFBlob || !secondDynamicPDFBlob) return;

        const pdfDoc = await PDFDocument.create();

        const signedPDF = await PDFDocument.load(await signedPdfBlob.arrayBuffer());
        const dynamicPDF = await PDFDocument.load(await dynamicPDFBlob.arrayBuffer());
        const secondDynamicPDF = await PDFDocument.load(await secondDynamicPDFBlob.arrayBuffer());

        const signedPages = await pdfDoc.copyPages(signedPDF, signedPDF.getPageIndices());
        signedPages.forEach(page => pdfDoc.addPage(page));

        const dynamicPages = await pdfDoc.copyPages(dynamicPDF, dynamicPDF.getPageIndices());
        dynamicPages.forEach(page => pdfDoc.addPage(page));

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
        <div className="min-h-screen bg-gray-100 dark:bg-slate-800 dark:text-white flex items-center justify-center">
            <div className="w-full max-w-4xl py-10 px-32 bg-white dark:bg-slate-900 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center dark:text-white mb-4">
                    Informe de desempeño estudiantil
                </h1>
                <p className="text-center text-lg dark:text-gray-300 mb-6">
                    Aquí podrás subir el plan de retroalimentación que se realizó a los estudiantes con bajo rendimiento el cual se adjutará con el informe de desempeño estudiantil para obtener el informe completo.<br/> 
                    Primero, sube el archivo PDF, luego haz click en el botón obtener informe y podrás visualizar el informe completo y descargarlo.
                </p>

                <div className="space-y-10">
                    {/* Section for combining PDFs */}
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-center dark:text-white mb-4">Combinar PDFs</h2>
                        <UploadPDF onFileUpload={setUserPDF} onClearUpload={clearAll} />
                        {dynamicPDFBlob && secondDynamicPDFBlob && (
                            <CombinePDFs
                                dynamicPDFBlob={dynamicPDFBlob}
                                userPDF={userPDF}
                                secondDynamicPDFBlob={secondDynamicPDFBlob}
                            />
                        )}
                    </div>

                    {/* Section for signing PDFs */}
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-center dark:text-white mb-4">Firmar PDF</h2>
                        {userPDF && (
                            <div className="flex flex-col items-center space-y-4">
                                <button onClick={() => startSigning(1)} className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700">
                                    Firmar con Canvas (Firma 1)
                                </button>
                                <button onClick={() => startUploadingImage(1)} className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700">
                                    Subir Imagen de Firma (Firma 1)
                                </button>
                                <button onClick={() => startSigning(2)} className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700">
                                    Firmar con Canvas (Firma 2)
                                </button>
                                <button onClick={() => startUploadingImage(2)} className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700">
                                    Subir Imagen de Firma (Firma 2)
                                </button>
                                {signing && (
                                    <div className="flex flex-col items-center">
                                        <SignatureCanvas ref={sigCanvas} canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }} />
                                        <button onClick={finishCanvasSigning} className="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700 mt-4">
                                            Finalizar Firma
                                        </button>
                                    </div>
                                )}
                                {uploadingImage && (
                                    <div className="flex flex-col items-center">
                                        <input type="file" accept="image/png, image/jpeg" onChange={handleImageUpload} />
                                    </div>
                                )}
                                {signedPdfBlob && (
                                    <div className="flex flex-col items-center">
                                        <a href={URL.createObjectURL(signedPdfBlob)} download="signed.pdf" className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700">
                                            Descargar PDF Firmado
                                        </a>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InformeSeguimiento;
