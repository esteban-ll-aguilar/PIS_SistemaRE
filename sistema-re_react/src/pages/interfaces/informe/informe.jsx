import React, { useRef } from 'react';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, Table, TableRow, TableCell, WidthType, ImageRun } from 'docx';
import StudentChart from './StudentChart';
import html2canvas from 'html2canvas';

export const Informe = () => {
    const chartRef = useRef();

    const students = [
        { name: 'Juan', grade: 90 },
        { name: 'Maria', grade: 85 },
        { name: 'Pedro', grade: 78 },
    ];

    const generateDocument = async () => {
        // Convierte el gráfico a una imagen usando html2canvas
        const chartCanvas = await html2canvas(chartRef.current.querySelector('canvas'));
        const chartDataUrl = chartCanvas.toDataURL('image/png');

        // Crea un documento Word usando docx
        const doc = new Document({
            sections: [
                {
                    properties: {},
                    children: [
                        new Paragraph({ text: "Informe de Notas de Estudiantes", heading: "TITLE", width: { size: 20, type: WidthType.PERCENTAGE }}),
                        new Paragraph({ text: "Tabla de Notas", heading: "HEADING_1" }),
                        new Table({
                            rows: [
                                new TableRow({
                                    children: [
                                        new TableCell({ children: [new Paragraph("Nombre")], width: { size: 50, type: WidthType.PERCENTAGE } }),
                                        new TableCell({ children: [new Paragraph("Nota")], width: { size: 50, type: WidthType.PERCENTAGE } }),
                                    ],
                                }),
                                ...students.map(student => new TableRow({
                                    children: [
                                        new TableCell({ children: [new Paragraph(student.name)] }),
                                        new TableCell({ children: [new Paragraph(student.grade.toString())] }),
                                    ],
                                })),
                            ],
                        }),
                        new Paragraph({ text: "Gráfico de Referencia", heading: "HEADING_1" }),
                        new Paragraph({
                            children: [
                                new ImageRun({
                                    data: chartDataUrl,
                                    transformation: {
                                        width: 300,
                                        height: 400,
                                    },
                                }),
                            ],
                        }),
                    ],
                },
            ],
        });

        // Guarda el documento como un archivo
        Packer.toBlob(doc).then((blob) => {
            saveAs(blob, "informe.docx");
        });
    };

    return (
        <div className="p-4">
            <div ref={chartRef} className="mb-5 w-80">
                <StudentChart data={students} />
            </div>
            <button 
                onClick={generateDocument} 
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
                Generar Documento Word
            </button>
        </div>
    );
};

export default Informe;
