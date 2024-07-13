import React, { useState } from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { PDFDocument } from "pdf-lib";
import Pdf from "./pdf.jsx";

const InformeSeguimiento = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [combinedPdf, setCombinedPdf] = useState(null);

  const handlePdfChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
    } else {
      alert("Por favor, seleccione un archivo PDF válido.");
    }
  };

  const combinePDFs = async (originalPDF, uploadedPDF) => {
    try {
      // Cargar los bytes del PDF original
      const originalPdfBytes = await originalPDF.arrayBuffer();
      const originalPdfDoc = await PDFDocument.load(originalPdfBytes);
  
      // Cargar los bytes del PDF subido
      const uploadedPdfBytes = await uploadedPDF.arrayBuffer();
      const uploadedPdfDoc = await PDFDocument.load(uploadedPdfBytes);
  
      // Obtener todas las páginas del PDF subido
      const pages = uploadedPdfDoc.getPages();
  
      // Agregar cada página del PDF subido al PDF original
      for (let page of pages) {
        const copiedPage = await originalPdfDoc.copyPages(uploadedPdfDoc, [page.index]);
        originalPdfDoc.addPage(copiedPage[0]);
      }
  
      // Guardar el PDF combinado
      const combinedPdfBytes = await originalPdfDoc.save();
  
      // Aquí podrías devolver o descargar el PDF combinado
      return combinedPdfBytes;
    } catch (error) {
      console.error("Error al combinar los PDFs:", error);
      throw error; // Propagar el error para manejarlo en un nivel superior
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100 dark:bg-slate-700 dark:text-white">
      <div className="text-center mb-4 text-xl">Subir y Combinar PDF</div>
      <input type="file" accept=".pdf" onChange={handlePdfChange} />
      <button
        onClick={combinePDFs}
        className="bg-blue-600 text-white rounded-sm px-10 py-2 mb-4"
      >
        Combinar PDF
      </button>
      {combinedPdf && (
        <PDFDownloadLink
          document={<Pdf pdfFile={combinedPdf} />}
          fileName="documento_combinado.pdf"
          className="bg-red-600 text-white rounded-sm px-10 py-2 mb-4"
        >
          {({ loading }) =>
            loading ? <button>Cargando...</button> : <button>Descargar PDF Combinado</button>
          }
        </PDFDownloadLink>
      )}
      <PDFViewer className="w-full h-full border-slate-800 dark:border-white">
        {combinedPdf && <Pdf pdfFile={combinedPdf} />}
      </PDFViewer>
    </div>
  );
};

export default InformeSeguimiento;
