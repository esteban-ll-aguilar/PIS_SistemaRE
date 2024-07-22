// src/components/MyDocument.js
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF', // Fondo blanco
    padding: 10
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    textAlign : "center"
  },
  image: {
    width: '550px',
    height: '345px'
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: "center",
  },
});

const MyDocument = ({ imageSources }) => (
  <Document>
    {imageSources.map((src, index) => (
      <Page size="A4" style={styles.page} key={index}>
        <View style={styles.section}>
          <Image style={styles.image} src={src} />
        </View>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    ))}
  </Document>
);

export default MyDocument;
