import React from "react";
import { saveAs } from "file-saver";
import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  Header,
  Footer,
  ImageRun,
  TextRun,
} from "docx";

import logo from "../../../assets/foranix.png"; // Asegúrate de tener el logo disponible para importarlo

export const Informe = () => {
  const unidad1 = [
    { cedula: "8974259639", nombre: "GUACHIZACA BERRU MAURICIO JOEL", CD: 1.07, PE: 1.33, AA: 1.07, EU: 1.87, Prom: 5.33 },
    { cedula: "8974259645", nombre: "LEON AGUILAR ESTEBAN HERMEL", CD: 2.12, PE: 2.12, AA: 2.12, EU: 2.12, Prom: 8.43 },
    { cedula: "8974259650", nombre: "POMA VERA BRADLEY ALEXANDER", CD: 1.07, PE: 1.33, AA: 1.07, EU: 1.87, Prom: 5.33 },
    { cedula: "8974259653", nombre: "ROBLES MAZA CHRISTIAN LEONARDO", CD: 2.12, PE: 2.12, AA: 2.12, EU: 2.12, Prom: 8.43 },
    { cedula: "8974259657", nombre: "TAMAYO MORENO MANUEL SANTIAGO", CD: 1.07, PE: 1.33, AA: 1.07, EU: 1.87, Prom: 5.33 },
  ];

  const unidad2 = [
    { cedula: "8974259639", nombre: "GUACHIZACA BERRU MAURICIO JOEL", CD: 1.07, PE: 1.33, AA: 1.07, EU: 1.87, Prom: 5.33 },
    { cedula: "8974259645", nombre: "LEON AGUILAR ESTEBAN HERMEL", CD: 2.12, PE: 2.12, AA: 2.12, EU: 2.12, Prom: 8.43 },
    { cedula: "8974259650", nombre: "POMA VERA BRADLEY ALEXANDER", CD: 1.07, PE: 1.33, AA: 1.07, EU: 1.87, Prom: 5.33 },
    { cedula: "8974259653", nombre: "ROBLES MAZA CHRISTIAN LEONARDO", CD: 2.12, PE: 2.12, AA: 2.12, EU: 2.12, Prom: 8.43 },
    { cedula: "8974259657", nombre: "TAMAYO MORENO MANUEL SANTIAGO", CD: 1.07, PE: 1.33, AA: 1.07, EU: 1.87, Prom: 5.33 },
  ];

  const unidad3 = [
    { cedula: "8974259639", nombre: "GUACHIZACA BERRU MAURICIO JOEL", CD: 1.07, PE: 1.33, AA: 1.07, EU: 1.87, Prom: 5.33 },
    { cedula: "8974259645", nombre: "LEON AGUILAR ESTEBAN HERMEL", CD: 2.12, PE: 2.12, AA: 2.12, EU: 2.12, Prom: 8.43 },
    { cedula: "8974259650", nombre: "POMA VERA BRADLEY ALEXANDER", CD: 1.07, PE: 1.33, AA: 1.07, EU: 1.87, Prom: 5.33 },
    { cedula: "8974259653", nombre: "ROBLES MAZA CHRISTIAN LEONARDO", CD: 2.12, PE: 2.12, AA: 2.12, EU: 2.12, Prom: 8.43 },
    { cedula: "8974259657", nombre: "TAMAYO MORENO MANUEL SANTIAGO", CD: 1.07, PE: 1.33, AA: 1.07, EU: 1.87, Prom: 5.33 },
  ];

  const final = [
    { cedula: "8974259639", nombre: "GUACHIZACA BERRU MAURICIO JOEL", Prom_Unidades: 5.33, Recuperacion: 9.95, C_Final: 8.01 },
    { cedula: "8974259645", nombre: "LEON AGUILAR ESTEBAN HERMEL", Prom_Unidades: 8.43, Recuperacion: 0, C_Final: 8.43 },
    { cedula: "8974259650", nombre: "POMA VERA BRADLEY ALEXANDER", Prom_Unidades: 5.33, Recuperacion: 9.95, C_Final: 8.01 },
    { cedula: "8974259653", nombre: "ROBLES MAZA CHRISTIAN LEONARDO", Prom_Unidades: 8.43, Recuperacion: 0, C_Final: 8.43 },
    { cedula: "8974259657", nombre: "TAMAYO MORENO MANUEL SANTIAGO", Prom_Unidades: 5.33, Recuperacion: 9.95, C_Final: 8.01 },
  ];

  const generateDocument = async () => {
    try {
      const logoBuffer = await fetch(logo).then(res => res.arrayBuffer());

      const createTable = (data, headers) => {
        return new Table({
          width: {
            size: 100,
            type: WidthType.PERCENTAGE,
          },
          rows: [
            new TableRow({
              children: headers.map(header => new TableCell({
                children: [new Paragraph(header)],
                alignment: AlignmentType.CENTER,
              })),
            }),
            ...data.map((row) => (
              new TableRow({
                children: Object.values(row).map(value => new TableCell({
                  children: [new Paragraph(value.toString())],
                  alignment: AlignmentType.CENTER,
                })),
              })
            )),
          ],
        });
      };

      const doc = new Document({
        sections: [
          {
            properties: {},
            headers: {
              default: new Header({
                children: [
                  new Paragraph({
                    children: [
                      new ImageRun({
                        data: logoBuffer,
                        transformation: {
                          width: 200, // Anchura del logo
                          height: 68, // Altura del logo
                        },
                        floating: {
                          horizontalPosition: {
                            align: "right",
                            relative: "page",
                          },
                          verticalPosition: {
                            align: "top",
                            relative: "page",
                          },
                        },
                      }),
                    ],
                  }),
                ],
              }),
            },
            footers: {
              default: new Footer({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "Sistema Desempeño Estudiantil",
                      }),
                    ],
                    alignment: AlignmentType.RIGHT,
                  }),
                ],
              }),
            },
            children: [
              new Paragraph({
                text: "Notas de los Estudiantes",
                heading: "HEADING_1",
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                text: "De las unidades 1, 2, 3 y promedio final",
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                text: "Unidad 1",
                heading: "HEADING_2",
                alignment: AlignmentType.LEFT,
              }),
              createTable(unidad1, ["Cedula", "Nombre", "CD", "PE", "AA", "EU", "Prom"]),
              new Paragraph({
                text: "Unidad 2",
                heading: "HEADING_2",
                alignment: AlignmentType.LEFT,
              }),
              createTable(unidad2, ["Cedula", "Nombre", "CD", "PE", "AA", "EU", "Prom"]),
              new Paragraph({
                text: "Unidad 3",
                heading: "HEADING_2",
                alignment: AlignmentType.LEFT,
              }),
              createTable(unidad3, ["Cedula", "Nombre", "CD", "PE", "AA", "EU", "Prom"]),
              new Paragraph({
                text: "Promedio Final",
                heading: "HEADING_2",
                alignment: AlignmentType.LEFT,
              }),
              createTable(final, ["Cedula", "Nombre", "Prom_Unidades", "Recuperacion", "C_Final"]),
            ],
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, "informe_notas.docx");
    } catch (error) {
      console.error("Error generando documento:", error);
    }
  };

  return (
    <div className="p-40">
      <h1 className="text-3xl font-bold text-center dark:text-white py-3">Informe de Notas</h1>
      <p className="mb-5 w-full md:w-3/4 lg:w-1/2 mx-auto dark:text-white text-justify">
        Este informe presenta las notas de los estudiantes del semestre actual. El objetivo es proporcionar una visión clara y concisa del rendimiento académico de cada estudiante, destacando sus logros y áreas de mejora. Esperamos que esta información sea útil para el seguimiento y apoyo continuo del desarrollo educativo de los estudiantes.
      </p>
      <button
        onClick={generateDocument}
        className="block px-4 py-2 mx-auto bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors duration-300 dark:bg-sky-700"
      >
        Generar Informe de Notas
      </button>
    </div>
  );
};

export default Informe;
