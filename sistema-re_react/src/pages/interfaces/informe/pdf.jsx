import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import Unl from '../../../assets/foranix.png';

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: "auto",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    textAlign: "justify",
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: 'center',
  }
});

function Pdf() {
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.titulo}>
          FACULTAD DE LA ENERGÍA, LAS INDUSTRIAS Y LOS RECURSOS NATURALES NO  soy un crackRENOVABLES
        </Text>
        <Image style={styles.image} src={Unl} />
        <Text style={styles.subtitle}>CARRERA DE COMPUTACIÓN</Text>
        <View style={styles.section}>
          <Text>
            INFORME DE DESEMPEÑO ESTUDIANTIL PERIODO ACADÉMICO: OCTUBRE 2023 – MARZO 2024
            EQUIPO RESPONSABLE Ing. Franco Hernán Salcedo López Ing. César Fernando Iñiguez Pineda
            DIRECTOR DE LA CARRERA Ing. Pablo Fernando Ordóñez MARZO 2024
          </Text>
        </View>
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `${pageNumber} / ${totalPages}`
        )} fixed />
      </Page>
    </Document>
  );
}

export default Pdf;
