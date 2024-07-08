import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import Unl from "../../../assets/foranix.png";
import Quipux from "../../../assets/quipux.png";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
    alignItems: "center", // Centra todos los elementos horizontalmente
  },
  page3: {
    flexDirection: "column",
    padding: 20,
    // Centra todos los elementos horizontalmente
  },
  page4: {

    padding: 20,
    // Centra todos los elementos horizontalmente
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
  tituloH: {
    fontSize: 14, // Tamaño de la fuente del título
    marginTop: 60,
    fontWeight: "bold", // Negrita
    color: "black", // Color del texto en modo negro
    marginLeft: 50
  },
  tituloH1: {
    fontSize: 14, // Tamaño de la fuente del título
    marginTop: 60,
    fontWeight: "bold", // Negrita
    color: "black", // Color del texto en modo negro
    textAlign: 'center'
  },
  titulopage3:{
    fontSize: 14, // Tamaño de la fuente del título
    marginTop: 60,
    marginLeft: 50,
    fontWeight: "bold", // Negrita
    color: "black",

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
  tituloDEE: {
    fontSize: 44, // Tamaño de la fuente del título
    textAlign: "center",
    marginTop: 170,
    fontWeight: "bold", // Negrita
    color: "black",
    marginBottom: 0, // Espacio entre las líneas del título
    lineHeight: 1.2, // Color del texto en modo negro
    
  },

  tituloD: {
    fontSize: 14, // Tamaño de la fuente del título
    textAlign: "left",
    marginTop: 60,
    fontWeight: "bold", // Negrita
    color: "black", // Color del texto en modo negro
    marginLeft: 50, 
  },
  tituloM: {
    fontSize: 14, // Tamaño de la fuente del título
    textAlign: "left",
    marginTop: 60,
    fontWeight: "bold", // Negrita
    color: "black", // Color del texto en modo negro
    marginLeft: 50, 
  },
  tituloD2: {
    fontSize: 14, // Tamaño de la fuente del título
    marginTop: 15,
    fontWeight: "bold", // Negrita
    color: "black", // Color del texto en modo negro
    marginLeft: 50

  },
  tituloO: {
    fontSize: 14, // Tamaño de la fuente del título
    textAlign: "left",
    marginTop: 60,
    marginBottom: 10,
    fontWeight: "bold", // Negrita
    color: "black", // Color del texto en modo negro
    marginLeft: 50, 
  },
  image: {
    width: "250px",
    height: "90px",
    marginBottom: 20,
    marginTop: 90,
  },
  image1: {
    width: "250px",
    height: "100px",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 5,
    marginTop: 20,
    marginLeft: 50 
  },
  subtitle0: {
    fontSize: 14,
    marginBottom: 5,
    marginTop: 10,
    marginLeft: 50 
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    textAlign: "justify",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: "center",
  },
  text: {
    marginTop: 30,
    textAlign: "center",
    fontSize: 12,
    // Centra el texto
  },
  textJustified: {
    marginTop: 10,
    textAlign: "justify",
    fontSize: 12, // Justifica el texto
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginTop: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
    textAlign: "center", // Centrar el texto
  },
  tableColT: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
    backgroundColor: "#DDDDDD",
    textAlign: "center", // Centrar el texto
  },
  tableCell: {
    fontSize: 10,
    textAlign: "center", // Centrar el texto
  },
  tableCellJustified: {
    fontSize: 10,
    textAlign: "justify", // Justificar el texto
  },
  Justified: {
    fontSize: 12,
    textAlign: "justify",
    marginBottom: 2, // Espacio entre las líneas del título
    lineHeight: 1.2,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 10,
    // Justificar el texto
  },
  Justified2: {
    fontSize: 12,
    textAlign: "justify",
    marginBottom: 2, // Espacio entre las líneas del título
    lineHeight: 1.2,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 10,
    // Justificar el texto
  },
  Justified6:  {
    fontSize: 12,
    textAlign: "justify",
    marginBottom: 2, // Espacio entre las líneas del título
    lineHeight: 1.2,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 80,
    // Justificar el texto
  },


  table2Col: {
    width: "50%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
    textAlign: "center", // Centrar el texto
  },
  table2ColT: {
    width: "50%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
    backgroundColor: "#DDDDDD",
    textAlign: "center", // Centrar el texto
  },
  singleColTable: {
    width: "50%",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginTop: 10,
    textAlign: "center",
  },
  tablapag3: {
    alignItems: "center",
    textAlign: "center",

  },
  singleColTableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    textAlign: "center",
  },
  singleColTableCol: {
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 10,
    textAlign: "center",
    backgroundColor: "#DDDDDD",
  },
  singleColTableCol2: {
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
    textAlign: "center",
  },
  singleColTableCell: {
    fontSize: 10,
    textAlign: "center",

  },
  bulletPoint: {
    fontSize: 12,
    marginRight: 5, // Margen derecho para acercar el texto al punto
  },
  listItemContent: {
    fontSize: 12,
    textAlign: "justify",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 10,
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 5,
  },
  lista: {
    textAlign: "left",
  },
});

function Pdf() {
  return (
    <Document>
      // Página 1
      <Page style={styles.page}>
        <Image style={styles.image} src={Unl} />
        <Text style={styles.titulo}>
          FACULTAD DE LA ENERGÍA, LAS INDUSTRIAS Y LOS RECURSOS
        </Text>
        <Text style={styles.titulo}>NATURALES NO RENOVABLES</Text>
        <Text style={styles.subtitle}>CARRERA DE COMPUTACIÓN</Text>
        <Image style={styles.image1} src={Quipux} />
        <Text style={styles.titulo}>INFORME DE DESEMPEÑO ESTUDIANTIL</Text>
        <Text style={styles.text}>
          PERIODO ACADÉMICO: OCTUBRE 2023 - MARZO 2024
        </Text>
        <Text style={styles.text}>EQUIPO RESPONSABLE</Text>
        <Text style={styles.textJustified}>
          Ing. Franco Hernán Salcedo López
        </Text>
        <Text style={styles.textJustified}>
          Ing. César Fernando Iñiguez Pineda
        </Text>
        <Text style={styles.text}>DIRECTOR DE LA CARRERA</Text>
        <Text style={styles.textJustified}>Ing. Pablo Fernando Ordóñez </Text>
        <Text style={styles.text}>MARZO 2024</Text>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
      // Página 2
      <Page style={styles.page}>
        <Text style={styles.tituloH1}>Historial de Revisiones</Text>
        <View style={styles.table}>
          {/* Primera fila con títulos */}
          <View style={styles.tableRow}>
            <View style={styles.tableColT}>
              <Text style={styles.tableCell}>Fecha</Text>
            </View>
            <View style={styles.tableColT}>
              <Text style={styles.tableCell}>Versión</Text>
            </View>
            <View style={styles.tableColT}>
              <Text style={styles.tableCell}>Descripción</Text>
            </View>
            <View style={styles.tableColT}>
              <Text style={styles.tableCell}>Autor</Text>
            </View>
          </View>
          {/* Filas de datos */}
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>26-Julio-2022</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Versión</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellJustified}>
                Informe versión inicial de informe
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellJustified}>
                Equipo de desempeño estudiantil
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Fila 2</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Fila 2</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellJustified}>Fila 2</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellJustified}>Fila 2</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Fila 3</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Fila 3</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellJustified}>Fila 3</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellJustified}>Fila 3</Text>
            </View>
          </View>
        </View>

        <Text style={styles.tituloH1}>Firmas de Responsabilidad</Text>
        <View style={styles.table}>
          {/* Primera fila con títulos */}
          <View style={styles.tableRow}>
            <View style={styles.table2ColT}>
              <Text style={styles.tableCell}>Elaborado por:</Text>
            </View>
            <View style={styles.table2ColT}>
              <Text style={styles.tableCell}>Firma</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.table2Col}>
              <Text style={styles.tableCell}>
                Ing. César Fernando Iñiguez Pineda M.Sc.
              </Text>
              <Text style={styles.tableCell}>
                {" "}
                EQUIPO DE DESEMPEÑO ESTUDIANTIL
              </Text>
            </View>
            <View style={styles.table2Col}>
              <Text style={styles.tableCell}> </Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.table2Col}>
              <Text style={styles.tableCell}>
                Ing. César Fernando Iñiguez Pineda M.Sc.
              </Text>
              <Text style={styles.tableCell}>
                {" "}
                EQUIPO DE DESEMPEÑO ESTUDIANTIL
              </Text>
            </View>
            <View style={styles.table2Col}>
              <Text style={styles.tableCell}> </Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.table2ColT}>
              <Text style={styles.tableCell}>Aprobado por:</Text>
            </View>
            <View style={styles.table2ColT}>
              <Text style={styles.tableCell}>Firma</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.table2Col}>
              <Text style={styles.tableCell}>Ing. Pablo Ordoñez M.Sc.</Text>
              <Text style={styles.tableCell}>
                CONSEJO CONSULTIVO CARRERA COMPUTACIÓN
              </Text>
            </View>
            <View style={styles.table2Col}>
              <Text style={styles.tableCell}> </Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.table2Col}>
              <Text style={styles.tableCell}>Ing. Wilman Chamba M.Sc.</Text>
              <Text style={styles.tableCell}>
                CONSEJO CONSULTIVO CARRERA COMPUTACIÓN
              </Text>
            </View>
            <View style={styles.table2Col}>
              <Text style={styles.tableCell}> </Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.table2Col}>
              <Text style={styles.tableCell}>
                Ing. Mario Cueva M.Sc.
                <Text style={styles.tableCell}>
                  CONSEJO CONSULTIVO CARRERA COMPUTACIÓN
                </Text>
              </Text>
            </View>
            <View style={styles.table2Col}>
              <Text style={styles.tableCell}> </Text>
            </View>
          </View>
        </View>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
      // Página 3
      <Page style={styles.page3}>
        <Text style={styles.tituloD}>1. DATOS GENERALES</Text>
        <View style={styles.tablapag3}>
        <View style={styles.singleColTable}>
          <View style={styles.singleColTableRow}>
            <View style={styles.singleColTableCol}>
              <Text style={styles.singleColTableCell}>
                <Text style={styles.boldText}>NOMBRE DE LA UNIVERSIDAD</Text>
              </Text>
            </View>
          </View>
          <View style={styles.singleColTableRow}>
            <View style={styles.singleColTableCol2}>
              <Text style={styles.singleColTableCell}>
                Universidad Nacional de Loja
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.singleColTable}>
          <View style={styles.singleColTableRow}>
            <View style={styles.singleColTableCol}>
              <Text style={styles.singleColTableCell}>
                <Text style={styles.boldText}>NOMBRE DE LA CARRERA</Text>
              </Text>
            </View>
          </View>
          <View style={styles.singleColTableRow}>
            <View style={styles.singleColTableCol2}>
              <Text style={styles.singleColTableCell}>
                CARRERA DE COMPUTACIÓN
              </Text>
            </View>
          </View>
        </View>
        </View>
        <Text style={styles.tituloD2}> A. DEFINICIÓN DE LA CARRERA</Text>
        <Text style={styles.Justified}>
          El Ingeniero en Sistemas / Computación formado en la Universidad
          Nacional de Loja, es un profesional de nivel superior, creativo y
          propositivo, con marcadas habilidades comunicativas y de adaptación y
          con una sólida preparación científica, técnica y humanística,
          orientado a desempeñarse eficientemente en la aplicación de la
          Ingeniería en Informática y Computación a la solución de problemas en
          beneficio del desarrollo sostenible de su entorno, liderando proyectos
          a partir del conocimiento de su realidad. Es un profesional solidario,
          con compromiso, con sensibilidad social y con visión prospectiva de
          las tendencias tecnológicas en el ámbito de su profesión, encaminado a
          la generación de soluciones que permitan el mejoramiento de la calidad
          de vida de su entorno y con una clara tendencia al cambio de la
          estructura del sistema social imperante.
        </Text>
        <Text style={styles.tituloD2}>B.1. VISIÓN DE LA CARRERA</Text>
        <Text style={styles.Justified}>
          La Universidad Nacional de Loja tiene como visión, consolidarse como
          una Comunidad Educativa, con excelencia académica, humanista y
          democrática, líder en el desarrollo de la cultura, la ciencia y la
          tecnología.
        </Text>
        <Text style={styles.tituloD2}>B.2. MISIÓN DE LA CARRERA </Text>
        <Text style={styles.Justified}>
          Es misión de la Universidad Nacional de Loja: la formación académica y
          profesional, con sólidas bases científicas y técnicas, pertinencia
          social y valores; la generación y aplicación de conocimientos
          científicos, tecnológicos y técnicos, que aporten al desarrollo
          integral del entorno y al avance de la ciencia; el fortalecimiento del
          pensamiento, la promoción, desarrollo y difusión de los saberes y
          culturas; y, la prestación de servicios especializados.
        </Text>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
      // Página 4
      <Page style={styles.page3}>
        <Text style={styles.titulopage3}>B.3. OBJETIVOS DE LA CARRERA</Text>
        <Text style={styles.subtitle}> Objetivo general</Text>
        <Text style={styles.Justified}>
          Objetivo general Fundamentar desde lo científico, teórico,
          metodológico, técnico, instrumental y humanístico los conocimientos de
          las ciencias básicas, ciencias tecnológicas, Algoritmos y Teoría de la
          Computación, Métodos y Tecnología de Software, Arquitectura de
          Sistemas y Computación Aplicada; que permitan el diseño,
          perfeccionamiento, implementación y evaluación de modelos y
          estrategias de innovación tecnológica para contribuir a la solución de
          problemas relacionados con: la generación de soluciones
          computacionales en correspondencia con el desarrollo social,
          Desarrollo de software y soluciones tecnológicas basadas en la
          innovación e investigación científica y Aplicación de la cobertura de
          las Tics en las empresas y en el sector rural; que aporten a la matriz
          productiva de la zona 7 del país.
        </Text>
        <Text style={styles.subtitle}> Objetivos específicos</Text>
        <View style={styles.listItem}>
          <Text style={styles.bulletPoint}>•</Text>
          <Text style={styles.listItemContent}>
            Asegurar la adquisición de conocimientos, capacidades y competencias
            profesionales dentro del campo de las matemáticas, física,
            programación, base de datos, investigación, ingeniería de software y
            sistemas inteligentes, con mentalidad innovadora para adaptarse a
            futuros escenarios profesionales.
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletPoint}>•</Text>
          <Text style={styles.listItemContent}>
            Desarrollar capacidades y competencias para la elaboración de
            propuestas viables a los problemas del desarrollo social
            relacionados con: Generar nuevas soluciones computacionales en
            correspondencia con el desarrollo social, Desarrollo de software y
            soluciones tecnológicas basadas en la innovación e investigación
            científica, y Aplicación de la cobertura de las Tics en las empresas
            y en el sector rural.
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletPoint}>•</Text>
          <Text style={styles.listItemContent}>
            Generar ambientes de aprendizaje activos que promuevan e incentiven
            en los estudiantes un desempeño auténtico que los prepare para
            desenvolverse de manera eficiente en su futuro profesional, acorde a
            las necesidades de la región y del país.
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletPoint}>•</Text>
          <Text style={styles.listItemContent}>
            Generar ambientes de aprendizaje activos que promuevan e incentiven
            en los estudiantes un desempeño auténtico que los prepare para
            desenvolverse de manera eficiente en su futuro profesional, acorde a
            las necesidades de la región y del país.
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletPoint}>•</Text>
          <Text style={styles.listItemContent}>
            Inculcar en los estudiantes una ciudadanía responsable, capaz de:
            ejercer sus derechos, respetar los derechos de los demás, cuidar el
            medio ambiente, cumplir con la normativa legal y sus obligaciones
            con ética profesional, capaz de practicar valores que promuevan el
            buen vivir dentro de su colectivo.
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bulletPoint}>•</Text>
          <Text style={styles.listItemContent}>
            Interculturalidad: Promover proyectos de innovación tecnológica en
            el ámbito de la computación enmarcados en las políticas nacionales
            del buen vivir que garanticen una sociedad inclusiva e
            intercultural.
          </Text>
        </View>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
      // Página 5
      <Page style={styles.page3}>
        <Text style={styles.tituloM}>2. MARCO Legal</Text>
        <Text style={styles.Justified2}>
          La Ley Orgánica de Educación Superior - LOES en el Artículo 5, literal
          b, d y g, señala como derechos estudiantiles:
        </Text>
        <View style={styles.lista}>
          <View style={styles.listItem}>
            <Text style={styles.bulletPoint}>b.</Text>
            <Text style={styles.listItemContent}>
              “Acceder a una educación superior de calidad y pertinente, que
              permita iniciar una carrera académica y/o profesional en igualdad
              de oportunidades”;
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bulletPoint}>d.</Text>
            <Text style={styles.listItemContent}>
              “Participar en el proceso de evaluación y acreditación de su
              carrera”;
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bulletPoint}>g.</Text>
            <Text style={styles.listItemContent}>
              “Participar en el proceso de construcción, difusión y aplicación
              del conocimiento”
            </Text>
          </View>
        </View>
        <Text style={styles.Justified}>
          De igual manera el Artículo 93 referente al Principio de calidad
          señala que: “El principio de calidad consiste en la búsqueda constante
          y sistemática de la excelencia, la pertinencia, producción óptima,
          transmisión del conocimiento y desarrollo del pensamiento mediante la
          autocrítica, la crítica externa y el mejoramiento permanente.”
        </Text>
        <Text style={styles.Justified}>
          En el REGLAMENTO DE RÉGIMEN ACADÉMICO DE LA UNIVERSIDAD NACIONAL DE
          LOJA aprobado en primera en sesión extraordinaria de 10 de noviembre
          de 2020; y, en segunda y definitiva, en sesión extraordinaria de 27 de
          enero de 2021, en sus artículos 201 al 204 menciona:
        </Text>
        <Text style={styles.Justified}>
          “Art. 201.- Del desempeño estudiantil. - El desempeño estudiantil es
          el acto y la consecuencia de la participación del estudiante en el
          desarrollo del proceso enseñanza-aprendizaje. (…).
        </Text>
        <Text style={styles.Justified}>
          Los aprendizajes que se valoran como parte del desempeño de los
          estudiantes, se evidencia en las calificaciones que se obtienen
          mediante la presentación de los productos de acreditación (tareas,
          lecciones, exámenes, otros) que se establecen para valorar los
          resultados de aprendizaje logrados por el estudiante.” (Lo resaltado
          en negrita nos pertenece).
        </Text>
        <Text style={styles.Justified}>
          “Art. 202.- Seguimiento del desempeño estudiantil. - Es el conjunto de
          acciones que se ejecutan en las carreras universitarias para la
          recopilación de información que fundamente el análisis, reflexión y
          valoración cualitativa y cuantitativa sobre los resultados de
          aprendizaje que va logrando o no el estudiante. (…)
        </Text>
        <Text style={styles.Justified}>
          El insumo fundamental de este proceso es el registro que lleva el
          docente sobre el cumplimiento y valoración de los productos de
          acreditación establecidos en el programa de estudios (sílabo) de la
          asignatura, curso o equivalente, en función del o los resultados de
          aprendizaje establecidos para cada una de las unidades didácticas o
          temas de estudio.” (Lo resaltado en negrita nos pertenece).
        </Text>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
      // Página 6
      <Page style={styles.page}>
        <Text style={styles.Justified6}>
          “Art. 203.- Retroalimentación del desempeño estudiantil. - Es el
          conjunto de acciones que se ejecutan en las carreras universitarias
          para retroalimentar el desempeño del estudiante en cada una de las
          unidades didácticas o temas de estudio de las asignaturas, cursos o
          equivalentes y, se fundamenta en los resultados del seguimiento al
          desempeño estudiantil. (…) Las acciones a implementarse podrán ser
          tutorías, envío de trabajos prácticos o autónomos, planteamiento y/o
          resolución de ejercicios o problemas de aplicación, entre otras (…).
          “(Lo resaltado en negrita nos pertenece).
        </Text>
        <Text style={styles.Justified}>
          “Art. 204.- Responsables del seguimiento al desempeño estudiantil. -
          Son responsables del seguimiento y retroalimentación del desempeño
          estudiantil, el decano/a de Facultad y Director de Educación a
          Distancia, el Director/a de carrera, los docentes y los estudiantes.
          (…)
        </Text>
        <Text style={styles.Justified}>
          Los directores/as de carrera y/o integrantes del Consejo Consultivo
          Académico, ejecutarán el seguimiento continuo del desempeño
          estudiantil y realizarán la coordinación, organización, planificación
          e informe de las acciones cumplidas para la retroalimentación del
          desempeño estudiantil en la carrera. Además, dispondrá al docente la
          ejecución de las acciones de retroalimentación acordadas
          participativamente a partir del análisis de los reportes de
          calificación de cada unidad. (…)
        </Text>
        <Text style={styles.Justified}>
          Para la ejecución de las acciones de retroalimentación del desempeño
          estudiantil el docente podrá utilizar la carga horaria asignada para
          actividades de tutoría o preparación, elaboración, aplicación y
          calificación de exámenes, trabajos y prácticas.
        </Text>
        <Text style={styles.Justified}>
          Los estudiantes deberán asistir obligatoria y puntualmente a las
          actividades que genere la carrera y cumplir de manera obligatoria y
          oportuna con los productos acreditables y condiciones que se
          establezcan para la retroalimentación del desempeño estudiantil en
          cada una de las unidades didácticas o temas de estudio, excepto la
          última unidad de la asignatura, curso o equivalente.” (Lo resaltado en
          negrita nos pertenece).
        </Text>
        <Text style={styles.Justified}>
          En vista que el Seguimiento al Desempeño Estudiantil, forma parte de
          la política de mejoramiento de la educación, y uno de sus principales
          componentes, es imperativo institucionalizar, particularmente en la
          Universidad Nacional de Loja.
        </Text>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
      // Página 7
      <Page style={styles.page3}>
        <Text style={styles.tituloO}>3. OBJETIVOS</Text>
        <Text style={styles.subtitle0}>GENERAL</Text>
        <Text style={styles.Justified}>
          Exponer los resultados del seguimiento al desempeño estudiantil de la
          Carrera de Computación correspondiente al periodo académico octubre
          2023 - marzo 2024, para encontrar indicadores que permita conocer el
          proceso educativo y tomar decisiones correctoras.
        </Text>
        <Text style={styles.subtitle0}>ESPECÍFICOS</Text>
        <View style={styles.lista}>
          <View style={styles.listItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.listItemContent}>
              Recolectar información de los estudiantes sobre el desempeño
              estudiantil mediante información proporcionada por los docentes de
              la carrera.
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.listItemContent}>
              Analizar el desempeño académico de los estudiantes en base a la
              información.
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.listItemContent}>
              Cumplir el criterio AG 5c y entregar un documento soporte que le
              permita al área correspondiente de la universidad tomar las
              correcciones que se crea conveniente
            </Text>
          </View>
        </View>
        <Text style={styles.subtitle0}>4. METODOLOGÍA</Text>
        <View style={styles.lista}>
          <Text style={styles.Justified}>
            La metodología usada para preparar el informe de seguimiento al
            desempeño estudiantil de la Carrera de Computación consistió en lo
            siguiente:
          </Text>
          <View style={styles.listItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.listItemContent}>
              Revisión de normativa del seguimiento al desempeño estudiantil
              Capítulo IV: Seguimiento al Desempeño estudiantil (ANEXO 1).
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.listItemContent}>
              Seleccionar a todos los docentes de la carrera correspondiente al
              periodo académico actual.
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.listItemContent}>
              Solicitud de las notas por cada unidad de las materias impartidas
              por cada docente.
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.listItemContent}>
              Recepción y tabulación de la información.
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.listItemContent}>
              Análisis de la información brindada por los docentes para obtener
              los resultados, conclusiones y recomendaciones.
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.listItemContent}>
              Entrega de informe de seguimiento al desempeño estudiantil de los
              resultados obtenidos.
            </Text>
          </View>
        </View>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
      // Página 8
      <Page style={styles.page3}>
        <Text style={styles.tituloH}>
          5. SEGUIMIENTO DEL DESEMPEÑO ESTUDIANTIL
        </Text>
        <Text style={styles.Justified}>
          La Dirección de la Carrera de Ingeniería en Computación, dando
          cumplimiento al NORMATIVO QUE ESTABLECE EL SEGUIMIENTO AL DESEMPEÑO
          ESTUDIANTIL DE LA UNIVERSIDAD NACIONAL DE LOJA, Artículo 201, en donde
          se menciona que el desempeño estudiantil es el acto y la consecuencia
          de la participación del estudiante en el desarrollo del proceso
          enseñanzaaprendizaje; consiste en la valoración continua de las
          capacidades científicotécnicas y actitudinales del estudiante, que
          expresa los aprendizajes logrados por éste durante su proceso de
          formación.
        </Text>
        <Text style={styles.Justified}>
          Se expresa en los reportes formales que ilustran el avance en los
          aprendizajes propuestos en el programa de estudios (sílabo) de las
          asignaturas que estructuran los diferentes períodos académicos
          ordinarios y, de modo general, el proyecto curricular de la carrera.
        </Text>
        <Text style={styles.Justified}>
          Los aprendizajes que se valoran como parte del desempeño de los
          estudiantes, se evidencia en las calificaciones que se obtienen
          mediante la presentación de los productos de acreditación (tareas,
          lecciones, exámenes, otros) que se establecen para valorar los
          resultados de aprendizaje logrados por el estudiante.
        </Text>
        <Text style={styles.Justified}>
          En la carrera de computación de la facultad de la Energía de la
          Universidad Nacional de Loja, es de fundamental importancia determinar
          el avance del rendimiento académico de los estudiantes en cada unidad,
          con la finalidad de determinar indicadores que permita conocer el
          proceso educativo y tomar decisiones correctoras.
        </Text>
        <Text style={styles.Justified}>
          Para alcanzar los objetivos propuesto, se han utilizado las
          calificaciones de las diferentes unidades de las asignaturas de la
          carrera de computación del área de Energía en el período octubre 2023
          - marzo 2024; los datos recopilados se sometieron a un análisis de
          correspondencias simples aplicada a una tabla de contingencia a la que
          le aplica un contraste de homogeneidad a través del test estadístico
          X2 (ji-cuadrado). Para desarrollar el procedimiento se empleó el
          software Rstudio.
          <br>Obteniendo los siguientes resultados:</br>
        </Text>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
      // Página 9
      <Page style={styles.page3}>
        <Text style={styles.tituloH}>
          6. RETROALIMENTACIÓN DEL DESEMPEÑO ESTUDIANTIL.
        </Text>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
      // Página 10
      <Page style={styles.page3}>
        <Text style={styles.tituloH}>
          6. RETROALIMENTACIÓN DEL DESEMPEÑO ESTUDIANTIL.
        </Text>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
      // Página 11
      <Page style={styles.page3}>
        <Text style={styles.tituloH}>7. ACCIONES DE RETROALIMENTACIÓN</Text>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
      // Página 12
      <Page style={styles.page3}>
        <Text style={styles.tituloH}>7. ACCIONES DE RETROALIMENTACIÓN</Text>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
      // Página 13
      <Page style={styles.page3}>
        <Text style={styles.tituloH}>7. ACCIONES DE RETROALIMENTACIÓN</Text>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
      // Página 14
      <Page style={styles.page3}>
        <Text style={styles.tituloH}>7. ACCIONES DE RETROALIMENTACIÓN</Text>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
      // Página 15
      <Page style={styles.page3}>
        <Text style={styles.tituloH}>CONCLUSIONES</Text>
        <Text style={styles.Justified}>
          Luego del análisis de las calificaciones por asignaturas de la carrera
          de Computación y de acuerdo con la Normativa del Seguimiento al
          Desempeño Estudiantil de la Universidad Nacional de Loja, se llegó a
          las siguientes conclusiones:
        </Text>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
      // Página 16
      <Page style={styles.page3}>
        <Text style={styles.tituloH}>RECOMENDACIONES</Text>
        <Text style={styles.Justified}>
          Luego del análisis de las calificaciones por asignaturas de la carrera
          de Computación y de acuerdo con la Normativa del Seguimiento al
          Desempeño Estudiantil de la Universidad Nacional de Loja, se llegó a
          las siguientes conclusiones:
        </Text>
        <View style={styles.lista}>
          <View style={styles.listItem}>
            <Text style={styles.bulletPoint}>1.</Text>
            <Text style={styles.listItemContent}>
              Automatizar el proceso de seguimiento al desempeño estudiantil en
              la carrera y de esta manera agilizar, detectar y corregir a tiempo
              inconvenientes en el normal desempeño de las actividades
              académicas, priorizando cada criterio para su análisis detallado.
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bulletPoint}>2.</Text>
            <Text style={styles.listItemContent}>
              Socializar con el personal académico en qué consiste el proceso de
              Seguimiento al Desempeño estudiantil, y resaltar las ventajas del
              mismo.
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bulletPoint}>3.</Text>
            <Text style={styles.listItemContent}>
              Brindar capacitación continua facilitada por la Universidad
              Nacional de Loja con especial énfasis en el aprendizaje docente
              sobre pedagogía, metodologías y nuevas herramientas tecnológicas
              para mejorar el proceso de enseñanza aprendizaje, con esto se
              ayudará a mejorar el desempeño estudiantil.
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bulletPoint}>4.</Text>
            <Text style={styles.listItemContent}>
              Elaborar un formato institucional que contribuya a mejorar el
              desempeño académico de los estudiantes, especialmente aquellos que
              no logran los resultados esperados.
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bulletPoint}>5.</Text>
            <Text style={styles.listItemContent}>
              Generalizar a 3 unidades académicas por asignatura, de ser
              posible, de acuerdo a los contenidos de las mismas (estandarizar
              el número de estudiantes).
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bulletPoint}>6.</Text>
            <Text style={styles.listItemContent}>
              Realizar el proceso de seguimiento al desempeño estudiantil por
              cada Unidad, de esta forma garantizamos la mejora continua en el
              proceso de enseñanza aprendizaje.
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bulletPoint}>7.</Text>
            <Text style={styles.listItemContent}>
              Realizar consultas continuas a los estudiantes sobre qué
              herramientas aportan mayormente a mejorar el desempeño
              estudiantil.
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.bulletPoint}>8.</Text>
            <Text style={styles.listItemContent}>
              Realizar consultas continuas a los estudiantes sobre qué
              herramientas aportan mayormente a mejorar el desempeño
              estudiantil.
            </Text>
          </View>
        </View>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
      // Página 17
      <Page style={styles.page4}>
        <Text style={styles.tituloDEE}>
          ANEXO 1: NORMATIVA DEL SEGUIMIENTO AL DESEMPEÑO ESTUDIANTIL{" "}
        </Text>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
      // Página 18
      <Page style={styles.page3}>
        <Text style={styles.tituloDE}> CAPÍTULO IV</Text>
        <Text style={styles.titulo}>SEGUIMIENTO AL DESEMPEÑO ESTUDIANTIL</Text>
        <Text style={styles.Justified}>
          Art. 201.- Del desempeño estudiantil. - El desempeño estudiantil es el
          acto y la consecuencia de la participación del estudiante en el
          desarrollo del proceso enseñanzaaprendizaje. Consiste en la valoración
          continua de las capacidades científico-técnicas y actitudinales del
          estudiante, que expresa los aprendizajes logrados por este durante su
          proceso de formación.
        </Text>
        <Text style={styles.Justified}>
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
        <Text style={styles.Justified}>
          Art. 202.- Seguimiento del desempeño estudiantil.- Es el conjunto de
          acciones que se ejecutan en las carreras universitarias para la
          recopilación de información que fundamente el análisis, reflexión y
          valoración cualitativa y cuantitativa sobre los resultados de
          aprendizaje que va logrando o no el estudiante.
        </Text>
        <Text style={styles.Justified}>
          Se ejecuta a través del acompañamiento académico continuo que realiza
          el Director/a de carrera al logro de los resultados de aprendizaje del
          estudiante en las diferentes asignaturas, cursos o equivalentes. La
          responsabilidad podrá́ ser delegada a los integrantes del Consejo
          Académico Consultivo de carrera. Se asegurará, como parte de esta
          actividad, el desarrollo de las capacidades científico-técnicas y
          actitudinales del estudiante.{" "}
        </Text>
        <Text style={styles.Justified}>
          El insumo fundamental de este proceso es el registro que lleva el
          docente sobre el cumplimiento y valoración de los productos de
          acreditación establecidos en el programa de estudios (sílabo) de la
          asignatura, curso o equivalente, en función del o los resultados de
          aprendizaje establecidos para cada una de las unidades didácticas o
          temas de estudio.
        </Text>
        <Text style={styles.Justified}>
          Art. 203.- Retroalimentación del desempeño estudiantil.- Es el
          conjunto de acciones que se ejecutan en las carreras universitarias
          para retroalimentar el desempeño del estudiante en cada una de las
          unidades didácticas o temas de estudio de las asignaturas, cursos o
          equivalentes y, se fundamenta en los resultados del seguimiento al
          desempeño estudiantil.
        </Text>
        <Text style={styles.Justified}>
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
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
      // Página 19
      <Page style={styles.page}>
        <Text style={styles.Justified2}>
          Art. 204.- Responsables del seguimiento al desempeño estudiantil.- Son
          responsables del seguimiento y retroalimentación del desempeño
          estudiantil, el decano/a de Facultad y Director de Educación a
          Distancia, el Director/a de carrera, los docentes y los estudiantes.
        </Text>
        <Text style={styles.Justified}>
          El Decano/a de Facultad y el Director/a de la Unidad de Educación a
          Distancia, informaran al Vicerrector/a Académico/a sobre el
          cumplimiento de las acciones de seguimiento y refuerzo del desempeño
          de los estudiantes de las carreras de la unidad
          académicoadministrativa que corresponda. Para la elaboración del
          informe de seguimiento al desempeño estudiantil, se utilizará el
          formato elaborado y emitido por el Vicerrectorado Académico o
          Coordinación de Docencia.
        </Text>
        <Text style={styles.Justified}>
          Los Directores/as de carrera y/o integrantes del Consejo Consultivo
          Académico, ejecutaran el seguimiento continuo del desempeño
          estudiantil y realizarán la coordinación, organización, planificación
          e informe de las acciones cumplidas para la retroalimentación del
          desempeño estudiantil en la carrera. Además, dispondrá́ al docente la
          ejecución de las acciones de retroalimentación acordadas
          participativamente a partir del análisis de los reportes de
          calificación de cada unidad.
        </Text>
        <Text style={styles.Justified}>
          Los docentes de cada una de las asignaturas, cursos o equivalentes
          ejecutaran las acciones definidas participativamente en la carrera
          para retroalimentar los aprendizajes. Para la ejecución de las
          acciones de retroalimentación del desempeño estudiantil el docente
          podrá́ utilizar la carga horaria asignada para actividades de tutoría o
          preparación, elaboración, aplicación y calificación de exámenes,
          trabajos y prácticas.
        </Text>
        <Text style={styles.Justified}>
          Los estudiantes deberán asistir obligatoria y puntualmente a las
          actividades que genere la carrera y cumplir de manera obligatoria y
          oportuna con los productos acreditables y condiciones que se
          establezcan para la retroalimentación del desempeño estudiantil en
          cada una de las unidades didácticas o temas de estudio, excepto la
          última unidad de la asignatura, curso o equivalente.
        </Text>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
      // Página 20
      <Page style={styles.page4}>
        <Text style={styles.tituloDEE}>
          ANEXO 3: DISPOSICIÓN A DOCENTES DE ACCIONES DE RETROALOMENTACIÓN{" "}
        </Text>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
      // Página 21
      <Page style={styles.page}>
        <Text style={styles.tituloDE}>
          ANEXO 3: DISPOSICIÓN A DOCENTES DE ACCIONES DE RETROALOMENTACIÓN{" "}
        </Text>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
      // Página 22
      <Page style={styles.page}>
        <Text style={styles.tituloDE}>
          ANEXO 3: DISPOSICIÓN A DOCENTES DE ACCIONES DE RETROALOMENTACIÓN{" "}
        </Text>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
      // Página 23
      <Page style={styles.page}>
        <Text style={styles.tituloDE}>
          ANEXO 3: DISPOSICIÓN A DOCENTES DE ACCIONES DE RETROALOMENTACIÓN{" "}
        </Text>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
      // Página 24
      <Page style={styles.page}>
        <Text style={styles.tituloDE}>
          ANEXO 3: DISPOSICIÓN A DOCENTES DE ACCIONES DE RETROALOMENTACIÓN{" "}
        </Text>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
      // Página 25
      <Page style={styles.page3}>
        <Text style={styles.tituloDEE}>
          ANEXO 5: REPORTE DE REGISTRO DE LAS ACTIVIDADES DE TUTORÍA ACADÉMICAS
        </Text>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
}

export default Pdf;
