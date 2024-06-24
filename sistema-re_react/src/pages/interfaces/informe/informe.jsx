import React, { useRef } from "react";
import { saveAs } from "file-saver";
import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableRow,
  TableCell,
  WidthType,
  ImageRun,
} from "docx";
import html2canvas from "html2canvas";
import GraficasCiclo from "../../graphics/graficasCiclo";

export const Informe = () => {
  const chartRef = useRef();

  const students = [
    { name: "Juan", grade: 90 },
    { name: "Maria", grade: 85 },
    { name: "Pedro", grade: 78 },
  ];

  const generateDocument = async () => {
    try {
      // Convierte el gráfico a una imagen usando html2canvas
      const chartCanvas = await html2canvas(chartRef.current);
      const chartDataUrl = chartCanvas.toDataURL("image/png");

      // Crea un documento Word usando docx
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                text: "Informe de Notas de Estudiantes",
                heading: "TITLE",
              }),
              new Paragraph({ text: "Tabla de Notas", heading: "HEADING_1" }),
              new Table({
                rows: [
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [new Paragraph("Nombre")],
                        width: { size: 50, type: WidthType.PERCENTAGE },
                      }),
                      new TableCell({
                        children: [new Paragraph("Nota")],
                        width: { size: 50, type: WidthType.PERCENTAGE },
                      }),
                    ],
                  }),
                  ...students.map(
                    (student) =>
                      new TableRow({
                        children: [
                          new TableCell({
                            children: [new Paragraph(student.name)],
                          }),
                          new TableCell({
                            children: [new Paragraph(student.grade.toString())],
                          }),
                        ],
                      })
                  ),
                ],
              }),
              new Paragraph({
                text: "Gráfico de Referencia",
                heading: "HEADING_1",
              }),
              new Paragraph({
                children: [
                  new ImageRun({
                    data: chartDataUrl,
                    transformation: {
                      width: 500,
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
      const blob = await Packer.toBlob(doc);
      saveAs(blob, "informe.docx");
    } catch (error) {
      console.error("Error generating document:", error);
    }
  };

  return (
    <div className="p-4">
      <div ref={chartRef} className="mb-5 w-full md:w-3/4 lg:w-1/2 mx-auto">
        <GraficasCiclo />
      </div>
      <button
        onClick={generateDocument}
        className="block px-4 py-2 mx-auto bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors duration-300"
      >
        Generar Documento Word
      </button>
    </div>
  );
};

export default Informe;
