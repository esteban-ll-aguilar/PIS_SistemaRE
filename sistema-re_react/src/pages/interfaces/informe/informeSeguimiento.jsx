import React, { useState, useEffect } from 'react';
import { PDFDocument } from 'pdf-lib';
import { pdf } from '@react-pdf/renderer';
import DynamicPDF from './DynamicPDF';
import SecondDynamicPDF from './SecondDynamicPDF';
import UploadPDF from './UploadPDF';

function InformeSeguimiento() {
    const [userPDF, setUserPDF] = useState(null);
    const [dynamicPDFBlob, setDynamicPDFBlob] = useState(null);
    const [secondDynamicPDFBlob, setSecondDynamicPDFBlob] = useState(null);
    const [combinedPdfUrl, setCombinedPdfUrl] = useState(null);
    const [uploadMessage, setUploadMessage] = useState('');
    const [fileExists, setFileExists] = useState(false);
    const [existingPdfUrl, setExistingPdfUrl] = useState('');
    const [signatureImage1, setSignatureImage1] = useState(null);
    const [signatureImage2, setSignatureImage2] = useState(null);

    useEffect(() => {
        const generateDynamicPDFs = async () => {
            try {
                const dynamicPDFBlob = await pdf(<DynamicPDF />).toBlob();
                setDynamicPDFBlob(dynamicPDFBlob);

                const secondDynamicPDFBlob = await pdf(<SecondDynamicPDF />).toBlob();
                setSecondDynamicPDFBlob(secondDynamicPDFBlob);
            } catch (error) {
                console.error('Error generating dynamic PDFs:', error);
            }
        };

        generateDynamicPDFs();
    }, []);

    useEffect(() => {
        const checkFileExists = async () => {
            try {
                const filename = 'combined.pdf';
                const response = await fetch(`http://127.0.0.1:5000/documento/exists?filename=${filename}`);
                const result = await response.json();
                if (result.exists) {
                    setFileExists(true);
                    setExistingPdfUrl(`http://127.0.0.1:5000/documento/${filename}`);
                } else {
                    setFileExists(false);
                }
            } catch (error) {
                console.error('Error checking file existence:', error);
            }
        };

        checkFileExists();
    }, []);

    const clearAll = () => {
        setUserPDF(null);
        setDynamicPDFBlob(null);
        setSecondDynamicPDFBlob(null);
        setCombinedPdfUrl(null);
        setUploadMessage('');
        setFileExists(false);
        setExistingPdfUrl('');
        setSignatureImage1(null);
        setSignatureImage2(null);
    };

    const handleCombineAndUpload = async () => {
        if (!dynamicPDFBlob || !userPDF || !secondDynamicPDFBlob) {
            console.error("One or more PDFs are undefined");
            return;
        }

        try {
            const pdfDoc = await PDFDocument.create();
            const dynamicPdfDoc = await PDFDocument.load(await dynamicPDFBlob.arrayBuffer());
            const userPdfDoc = await PDFDocument.load(await userPDF.arrayBuffer());
            const secondDynamicPdfDoc = await PDFDocument.load(await secondDynamicPDFBlob.arrayBuffer());

            const dynamicPdfPages = await pdfDoc.copyPages(dynamicPdfDoc, dynamicPdfDoc.getPageIndices());
            dynamicPdfPages.forEach(page => pdfDoc.addPage(page));

            const userPdfPages = await pdfDoc.copyPages(userPdfDoc, userPdfDoc.getPageIndices());
            userPdfPages.forEach(page => pdfDoc.addPage(page));

            const secondDynamicPdfPages = await pdfDoc.copyPages(secondDynamicPdfDoc, secondDynamicPdfDoc.getPageIndices());
            secondDynamicPdfPages.forEach(page => pdfDoc.addPage(page));

            const combinedPdfBytes = await pdfDoc.save();
            const combinedPdfBlob = new Blob([combinedPdfBytes], { type: 'application/pdf' });
            const combinedPdfUrl = URL.createObjectURL(combinedPdfBlob);
            setCombinedPdfUrl(combinedPdfUrl);
        } catch (error) {
            console.error('Error combining PDFs:', error);
        }
    };

    const handleUploadPdf = async () => {
        if (!combinedPdfUrl) return;

        try {
            const response = await fetch(combinedPdfUrl);
            const blob = await response.blob();
            const file = new File([blob], 'combined.pdf', { type: 'application/pdf' });

            const formData = new FormData();
            formData.append('file', file);

            const uploadResponse = await fetch('http://127.0.0.1:5000/guardar/documento', {
                method: 'POST',
                body: formData,
            });

            const result = await uploadResponse.json();
            if (uploadResponse.ok) {
                setUploadMessage('Documento guardado correctamente');
                setFileExists(true);
                setExistingPdfUrl(`http://127.0.0.1:5000/documento/combined.pdf`);
            } else {
                setUploadMessage(result.message);
            }
        } catch (error) {
            setUploadMessage('Error al subir el documento');
            console.error('Error uploading PDF:', error);
        }
    };

    const handleSignatureChange1 = (event) => {
        const file = event.target.files[0];
        if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSignatureImage1(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            alert('Por favor sube una imagen PNG o JPG.');
        }
    };

    const handleSignatureChange2 = (event) => {
        const file = event.target.files[0];
        if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSignatureImage2(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            alert('Por favor sube una imagen PNG o JPG.');
        }
    };

    const handleSignDocument = async () => {
        if (!existingPdfUrl || !signatureImage1 || !signatureImage2) return;

        try {
            const existingPdfBytes = await fetch(existingPdfUrl).then(res => res.arrayBuffer());
            const pdfDoc = await PDFDocument.load(existingPdfBytes);

            const signatureImageBytes1 = await fetch(signatureImage1).then(res => res.arrayBuffer());
            const signatureImageEmbed1 = await pdfDoc.embedPng(signatureImageBytes1);

            const signatureImageBytes2 = await fetch(signatureImage2).then(res => res.arrayBuffer());
            const signatureImageEmbed2 = await pdfDoc.embedPng(signatureImageBytes2);

            const pages = pdfDoc.getPages();
            if (pages.length < 2) {
                throw new Error('El documento debe tener al menos 2 páginas para colocar las firmas en la página 2.');
            }

            const secondPage = pages[1]; // Página 2 (índice 1)
            const { width, height } = secondPage.getSize();
            secondPage.drawImage(signatureImageEmbed1, {
                x: 383, y: 515, width: 110, height: 70
            });

            secondPage.drawImage(signatureImageEmbed2, {
                x: 383, y: 456, width: 110, height: 70
            });

            const signedPdfBytes = await pdfDoc.save();
            const signedPdfBlob = new Blob([signedPdfBytes], { type: 'application/pdf' });
            const signedPdfUrl = URL.createObjectURL(signedPdfBlob);

            const a = document.createElement('a');
            a.href = signedPdfUrl;
            a.download = 'combined_signed.pdf';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            console.log('Documento firmado y descargado automáticamente.');
        } catch (error) {
            console.error('Error signing the document:', error);
        }
    };

    useEffect(() => {
        if (signatureImage1 && signatureImage2) {
            handleSignDocument();
        }
    }, [signatureImage1, signatureImage2]);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-slate-800 dark:text-white flex items-center justify-center">
            <div className="w-full max-w-4xl py-10 px-32 bg-white dark:bg-slate-900 rounded-lg shadow-lg">
                <div className="space-y-10">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-md">
                        {!fileExists ? (
                            <>
                                <div className='items-center justify-center text-center'>
                                    <h1 className="text-3xl font-bold text-center dark:text-white mb-4">
                                        Subir retroalimentación estudiantil
                                    </h1>
                                    <p className="text-justify text-lg dark:text-gray-300 mb-6">
                                        Aquí podrás subir el plan de retroalimentación que se realizó a los estudiantes con bajo rendimiento, el cual se adjuntará con el informe de desempeño estudiantil para obtener el informe completo.<br/>
                                        Primero, sube el archivo PDF, luego haz clic en el botón obtener informe y podrás visualizar el informe completo y descargarlo.
                                    </p>
                                </div>
                                <div>
                                    <UploadPDF onFileUpload={setUserPDF} onClearUpload={clearAll} />
                                    {dynamicPDFBlob && secondDynamicPDFBlob && (
                                        <button onClick={handleCombineAndUpload} className="ml-52 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700">
                                            Obtener Informe
                                        </button>
                                    )}
                                    {combinedPdfUrl && (
                                        <button onClick={handleUploadPdf} className="ml-52 px-7 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700 mt-4">
                                            Subir  Informe
                                        </button>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="text-center">
                                <h1 className="text-3xl font-bold text-center dark:text-white mb-4">
                                    Subir firmas para validez del informe de desempeño estudiantil
                                </h1>
                                <p className="text-lg mb-4 text-justify">El informe ya está subido; solo falta firmar para validar este documento. Aquí podrás visualizar el informe subido. Solo sube las firmas y se generará el documento de manera automática.</p>
                                <div className="mt-4">
                                    <iframe src={existingPdfUrl} width="100%" height="500px" title="Existing PDF" className='mb-10 mt-5'></iframe>
                                    <div className='mt-10 mb-10'>
                                        <a href={existingPdfUrl} download="combined.pdf" className="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700">
                                            Descargar Informe sin firmas
                                        </a>
                                    </div>
                                    <div className='mt-5'>
                                        <input type="file" onChange={handleSignatureChange1} accept="image/png, image/jpeg" className="mt-4"/>
                                    </div>
                                    <div className='mt-5'>
                                        <input type="file" onChange={handleSignatureChange2} accept="image/png, image/jpeg" className="mt-4"/>
                                        <p className="mt-4 text-lg">{uploadMessage}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InformeSeguimiento;
