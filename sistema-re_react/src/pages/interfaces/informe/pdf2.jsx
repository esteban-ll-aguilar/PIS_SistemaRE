import React from "react";
import { Document, Page, Text, StyleSheet } from "@react-pdf/renderer";

const styles2 = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
    alignItems: "center", // Centra todos los elementos horizontalmente
  },
  page10: {
    flexDirection: "column",
    padding: 20,
  },
  page4: {
    padding: 20,
  },
  pageNumber2: {
    position: "absolute",
    fontSize: 12,
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: "center",
  },
  tituloc: {
    fontSize: 14, // Tamaño de la fuente del título
    marginTop: 60,
    fontWeight: "bold", // Negrita
    color: "black", // Color del texto en modo negro
    marginLeft: 50,
  },
  tituloDEE: {
    fontSize: 44, // Tamaño de la fuente del título
    textAlign: "center",
    marginTop: 170,
    fontWeight: "bold", // Negrita
    color: "black",
    marginBottom: 0, // Espacio entre las líneas del título
    lineHeight: 1.2, // Color del texto en modo negro
  },
  tituloDE: {
    fontSize: 14, // Tamaño de la fuente del título
    textAlign: "center",
    marginTop: 70,
    fontWeight: "bold", // Negrita
    color: "black",
    marginBottom: 0, // Espacio entre las líneas del título
    lineHeight: 1.2, // Color del texto en modo negro
  },
  titulo: {
    fontSize: 14, // Tamaño de la fuente del título
    textAlign: "center",
    margintop: 20,
    fontWeight: "bold", // Negrita
    marginBottom: 0, // Espacio entre las líneas del título
    lineHeight: 1.2,
    color: "black", // Color del texto en modo negro
  },
  Justified: {
    fontSize: 12,
    textAlign: "justify",
    marginBottom: 2, // Espacio entre las líneas del título
    lineHeight: 1.2,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 10,
  },
  Justified2: {
    fontSize: 12,
    textAlign: "justify",
    marginBottom: 2, // Espacio entre las líneas del título
    lineHeight: 1.2,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 10,
  },
});

const PDF2 = () => (
  <Document>
    <Page style={styles2.page10}>
      <Text style={styles2.tituloc}>CONCLUSIONES</Text>
      <Text style={styles2.Justified}>
        Luego del análisis de las calificaciones por asignaturas de la carrera
        de Computación y de acuerdo con la Normativa del Seguimiento al
        Desempeño Estudiantil de la Universidad Nacional de Loja, se llegó a
        las siguientes conclusiones:
      </Text>

      <Text
        style={styles2.pageNumber2}
        render={({ pageNumber, totalPages }) =>
          `${pageNumber} / ${totalPages}`
        }
        fixed
      />
    </Page>

    <Page style={styles2.page10}>
      <Text style={styles2.tituloc}>RECOMENDACIONES</Text>
    </Page>

    <Page style={styles2.page4}>
      <Text style={styles2.tituloDEE}>
        ANEXO 1: NORMATIVA DEL SEGUIMIENTO AL DESEMPEÑO ESTUDIANTIL{" "}
      </Text>
      <Text
        style={styles2.pageNumber2}
        render={({ pageNumber, totalPages }) =>
          `${pageNumber} / ${totalPages}`
        }
        fixed
      />
    </Page>
    
    <Page style={styles2.page10}>
      <Text style={styles2.tituloDE}> CAPÍTULO IV</Text>
      <Text style={styles2.titulo}>SEGUIMIENTO AL DESEMPEÑO ESTUDIANTIL</Text>
      <Text style={styles2.Justified}>
        Art. 201.- Del desempeño estudiantil. - El desempeño estudiantil es el
        acto y la consecuencia de la participación del estudiante en el
        desarrollo del proceso enseñanzaaprendizaje. Consiste en la valoración
        continua de las capacidades científico-técnicas y actitudinales del
        estudiante, que expresa los aprendizajes logrados por este durante su
        proceso de formación.
      </Text>
      <Text style={styles2.Justified}>
        Se expresa en los reportes formales que ilustran el avance en los
        aprendizajes propuestos en el programa de estudios (sílabo) de las
        asignaturas que estructuran los diferentes periodos académicos
        ordinarios y, de modo general, el proyecto curricular de la carrera.
        Los aprendizajes que se valoran como parte del desempeño de los
        estudiantes, se evidencia en las calificaciones que se obtienen
        mediante la presentación de los productos de acreditación (tareas,
        lecciones, exámenes, otros) que se establecen para valorar los
        resultados de aprendizaje logrados por el estudiante.{" "}
      </Text>
      <Text style={styles2.Justified}>
        Art. 202.- Seguimiento del desempeño estudiantil.- Es el conjunto de
        acciones que se ejecutan en las carreras universitarias para la
        recopilación de información que fundamente el análisis, reflexión y
        valoración cualitativa y cuantitativa sobre los resultados de
        aprendizaje que va logrando o no el estudiante.
      </Text>
      <Text style={styles2.Justified}>
        Se ejecuta a través del acompañamiento académico continuo que realiza
        el Director/a de carrera al logro de los resultados de aprendizaje del
        estudiante en las diferentes asignaturas, cursos o equivalentes. La
        responsabilidad podrá́ ser delegada a los integrantes del Consejo
        Académico Consultivo de carrera. Se asegurará, como parte de esta
        actividad, el desarrollo de las capacidades científico-técnicas y
        actitudinales del estudiante.{" "}
      </Text>
      <Text style={styles2.Justified}>
        El insumo fundamental de este proceso es el registro que lleva el
        docente sobre el cumplimiento y valoración de los productos de
        acreditación establecidos en el programa de estudios (sílabo) de la
        asignatura, curso o equivalente, en función del o los resultados de
        aprendizaje establecidos para cada una de las unidades didácticas o
        temas de estudio.
      </Text>
      <Text style={styles2.Justified}>
        Art. 203.- Retroalimentación del desempeño estudiantil.- Es el
        conjunto de acciones que se ejecutan en las carreras universitarias
        para retroalimentar el desempeño del estudiante en cada una de las
        unidades didácticas o temas de estudio de las asignaturas, cursos o
        equivalentes y, se fundamenta en los resultados del seguimiento al
        desempeño estudiantil.
      </Text>
      <Text style={styles2.Justified}>
        Con base en el resultado del seguimiento al desempeño académico, se
        podrán coordinar acciones con los docentes, para aquellos estudiantes
        que no han logrado alcanzar los resultados de aprendizaje esperados.
        Las acciones estarán orientadas a contribuir a que el estudiante logre
        los conocimientos, capacidades y valores previstos en los resultados
        de aprendizaje de las unidades didácticas o temas de estudio de las
        diferentes asignaturas, cursos o equivalentes. Las acciones a
        implementarse podrán ser tutorías, envió de trabajos prácticos o
        autónomos, planteamiento y/o resolución de ejercicios o problemas de
        aplicación, entre otras y constaran en el formato que para el efecto
        elabore y emita el Vicerrector o Vicerrectora Académica o un delegado
        del Rector.{" "}
      </Text>

      <Text
        style={styles2.pageNumber2}
        render={({ pageNumber, totalPages }) =>
          `${pageNumber} / ${totalPages}`
        }
        fixed
      />
    </Page>

    <Page style={styles2.page}>
      <Text style={styles2.Justified2}>
        Art. 204.- Responsables del seguimiento al desempeño estudiantil.- Son
        responsables del seguimiento y retroalimentación del desempeño
        estudiantil, el decano/a de Facultad y Director de Educación a
        Distancia, el Director/a de carrera, los docentes y los estudiantes.
      </Text>
      <Text style={styles2.Justified}>
        El Decano/a de Facultad y el Director/a de la Unidad de Educación a
        Distancia, informaran al Vicerrector/a Académico/a sobre el
        cumplimiento de las acciones de seguimiento y refuerzo del desempeño
        de los estudiantes de las carreras de la unidad
        académicoadministrativa que corresponda. Para la elaboración del
        informe de seguimiento al desempeño estudiantil, se utilizará el
        formato elaborado y emitido por el Vicerrectorado Académico o
        Coordinación de Docencia.
      </Text>
      <Text style={styles2.Justified}>
        Los Directores/as de carrera y/o integrantes del Consejo Consultivo
        Académico, ejecutaran el seguimiento continuo del desempeño
        estudiantil y realizarán la coordinación, organización, planificación
        e informe de las acciones cumplidas para la retroalimentación del
        desempeño estudiantil en la carrera. Además, dispondrá́ al docente la
        ejecución de las acciones de retroalimentación acordadas
        participativamente a partir del análisis de los reportes de
        calificación de cada unidad.
      </Text>
      <Text style={styles2.Justified}>
        Los docentes de cada una de las asignaturas, cursos o equivalentes
        ejecutaran las acciones definidas participativamente en la carrera
        para retroalimentar los aprendizajes. Para la ejecución de las
        acciones de retroalimentación del desempeño estudiantil el docente
        podrá́ utilizar la carga horaria asignada para actividades de tutoría o
        preparación, elaboración, aplicación y calificación de exámenes,
        trabajos y prácticas.
      </Text>
      <Text style={styles2.Justified}>
        Los estudiantes deberán asistir obligatoria y puntualmente a las
        actividades que genere la carrera y cumplir de manera obligatoria y
        oportuna con los productos acreditables y condiciones que se
        establezcan para la retroalimentación del desempeño estudiantil en
        cada una de las unidades didácticas o temas de estudio, excepto la
        última unidad de la asignatura, curso o equivalente.
      </Text>
      <Text
        style={styles2.pageNumber2}
        render={({ pageNumber, totalPages }) =>
          `${pageNumber} / ${totalPages}`
        }
        fixed
      />
    </Page>

    <Page style={styles2.page4}>
      <Text style={styles2.tituloDEE}>
        ANEXO 3: DISPOSICIÓN A DOCENTES DE ACCIONES DE RETROALOMENTACIÓN{" "}
      </Text>
      <Text
        style={styles2.pageNumber2}
        render={({ pageNumber, totalPages }) =>
          `${pageNumber} / ${totalPages}`
        }
        fixed
      />
    </Page>

    <Page style={styles2.page10}>
      <Text style={styles2.tituloDEE}>
        ANEXO 4: MEMORANDOS INFORMANDO DE LAS ACCIONES DE RETROALIMENTACIÓN
      </Text>
      <Text
        style={styles2.pageNumber2}
        render={({ pageNumber, totalPages }) =>
          `${pageNumber} / ${totalPages}`
        }
        fixed
      />
    </Page>

    <Page style={styles2.page10}>
      <Text style={styles2.tituloDEE}>
        ANEXO 5: REPORTE DE REGISTRO DE LAS ACTIVIDADES DE TUTORÍA ACADÉMICAS
      </Text>
      <Text
        style={styles2.pageNumber2}
        render={({ pageNumber, totalPages }) =>
          `${pageNumber} / ${totalPages}`
        }
        fixed
      />
    </Page>
  </Document>
);

export default PDF2;
