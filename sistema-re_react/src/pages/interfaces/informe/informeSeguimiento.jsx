import React from "react";
import PDF from "./pdf.jsx";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";

export const Informe = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100 dark:bg-slate-700 dark:text-white">
      <div className="text-center mb-4 text-xl">Descargar el informe</div>
      <PDFDownloadLink 
        document={<PDF />} 
        fileName="informe.pdf" 
        className="bg-red-600 text-white rounded-sm px-10 py-2 mb-4 dark:bg-red-800 dark:text-white"
      >
        {({ loading }) => 
          loading ? <button>Cargando...</button> : <button>Descargar</button>
        }
      </PDFDownloadLink>
      <PDFViewer className="w-full h-full border-slate-800 dark:border-white">
        <PDF />
      </PDFViewer>
    </div>
  );
};

export default Informe;
