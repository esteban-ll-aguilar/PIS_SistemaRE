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
  Media,
} from "docx";
import html2canvas from "html2canvas";
import Graficas from "../../graphics/graficas"; // Asumiendo que este es el nombre del componente que contiene las gráficas

export const Informe = () => {
  const chartRef = useRef();

  const students = [
    { name: "Juan", grade: 90 },
    { name: "Maria", grade: 85 },
    { name: "Pedro", grade: 78 },
  ];

  const generateDocument = async () => {
    try {
      // Capturar las gráficas como imágenes usando html2canvas
      const graficasImage = await html2canvas(chartRef.current, {
        scrollY: -window.scrollY,
        scale: 2,
      });

      // Crear el documento Word
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                text: "Informe de Notas de Estudiantes con Gráficas",
                heading: "TITLE",
              }),
              new Paragraph({
                text: "Tabla de Notas",
                heading: "HEADING_1",
              }),
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
                            children: [
                              new Paragraph(student.grade.toString()),
                            ],
                          }),
                        ],
                      })
                  ),
                ],
              }),
              new Paragraph({
                text: "Gráficas de Rendimiento",
                heading: "HEADING_1",
              }),
              new Paragraph({
                children: [
                  new Media({
                    data: graficasImage.toDataURL(),
                    type: "image/png",
                  }),
                ],
              }),
            ],
          },
        ],
      });

      // Convertir el documento a Blob y guardarlo
      const blob = await Packer.toBlob(doc);
      saveAs(blob, "informe_con_graficas.docx");
    } catch (error) {
      console.error("Error generating document:", error);
    }
  };

  return (
    <div className="p-10">
      <p className="mb-5 w-full md:w-3/4 lg:w-1/2 mx-auto text-center dark:text-white">
        Aquí puede generar las notas de los estudiantes para realizar el informe.
      </p>
      <Graficas ref={chartRef} />
      <button
        onClick={generateDocument}
        className="block px-4 py-2 mx-auto bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors duration-300 dark:bg-sky-700"
      >
        Generar Informe con Gráficas
      </button>
    </div>
  );
};

export default Informe;
