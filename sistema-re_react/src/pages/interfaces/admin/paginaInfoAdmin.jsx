import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const PaginaInfoAdmin = () => {
    return (
        <div style={{ fontFamily: "Times New Roman", width: '70%', margin: '0 auto' }}>
            <h4 className="text-2xl dark:text-white font-bold mb-2" style={{ textAlign: 'justify', marginBottom: '1em' }} >
                Seguimiento al rendimiento estudiantil
            </h4>

            <p style={{ textAlign: 'justify', marginBottom: '1em' }}>
                La Dirección de la Carrera de Ingeniería en Computación, dando cumplimiento
                al NORMATIVO QUE ESTABLECE EL SEGUIMIENTO AL DESEMPEÑO
                ESTUDIANTIL DE LA UNIVERSIDAD NACIONAL DE LOJA, Artículo 201, en
                donde se menciona que el desempeño estudiantil es el acto y la consecuencia
                de la participación del estudiante en el desarrollo del proceso enseñanzaaprendizaje; consiste en la valoración continua de las capacidades científicotécnicas y actitudinales del estudiante, que expresa los aprendizajes logrados
                por éste durante su proceso de formación.
            </p>

            <p style={{ textAlign: 'justify', marginBottom: '1em' }}>
                Se expresa en los reportes formales que ilustran el avance en los aprendizajes
                propuestos en el programa de estudios (sílabo) de las asignaturas que
                estructuran los diferentes períodos académicos ordinarios y, de modo general,
                el proyecto curricular de la carrera.
            </p>

            <p style={{ textAlign: 'justify', marginBottom: '1em' }}>
                Los aprendizajes que se valoran como parte del desempeño de los
                estudiantes, se evidencia en las calificaciones que se obtienen mediante la
                presentación de los productos de acreditación (tareas, lecciones, exámenes,
                otros) que se establecen para valorar los resultados de aprendizaje logrados
                por el estudiante.

            </p>

            <p style={{ textAlign: 'justify', marginBottom: '1em' }}>
                En la carrera de computación de la facultad de la Energía de la Universidad
                Nacional de Loja, es de fundamental importancia determinar el avance del
                rendimiento académico de los estudiantes en cada unidad, con la finalidad de
                determinar indicadores que permita conocer el proceso educativo y tomar
                decisiones correctoras.

            </p>

            <h4 className="text-2xl dark:text-white font-bold mb-2 mt-4">
                Responsable de la comitiva
            </h4>
            <p className=" dark:text-white font-bold mb-2 mt-4" style={{ textAlign: 'justify', marginBottom: '1em' }}>
                Art. 204.- Responsables del seguimiento al desempeño estudiantil
            </p>

            <p style={{ textAlign: 'justify', marginBottom: '1em' }}>
                Son responsables del seguimiento y retroalimentación del desempeño estudiantil, el
                decano/a de Facultad y Director de Educación a Distancia, el Director/a de
                carrera, los docentes y los estudiantes.
            </p>

            <p style={{ textAlign: 'justify', marginBottom: '1em' }}>
                El Decano/a de Facultad y el Director/a de la Unidad de Educación a Distancia,
                informarán al Vicerrector/a Académico/a sobre el cumplimiento de las acciones de
                seguimiento y refuerzo del desempeño de los estudiantes de las carreras de la
                unidad académico-administrativa que corresponda. Para la elaboración del
                informe de seguimiento al desempeño estudiantil, se utilizará el formato elaborado
                y emitido por el Vicerrectorado Académico o Coordinación de Docencia.

            </p>

            <p style={{ textAlign: 'justify', marginBottom: '1em' }}>
                Los docentes de cada una de las asignaturas, cursos o equivalentes ejecutarán
                las acciones definidas participativamente en la carrera para retroalimentar los
                aprendizajes. Para la ejecución de las acciones de retroalimentación del
                desempeño estudiantil el docente podrá utilizar la carga horaria asignada para
                actividades de tutoría o preparación, elaboración, aplicación y calificación de
                exámenes, trabajos y prácticas.
            </p>

            <p style={{ textAlign: 'justify', marginBottom: '1em' }}>
                Los estudiantes deberán asistir obligatoria y puntualmente a las actividades que
                genere la carrera y cumplir de manera obligatoria y oportuna con los productos
                acreditables y condiciones que se establezcan para la retroalimentación del
                desempeño estudiantil en cada una de las unidades didácticas o temas de
                estudio, excepto la última unidad de la asignatura, curso o equivalente.

            </p>

            <h4 className="text-2xl dark:text-white font-bold mb-2 mt-4">
                Reglas de Uso
            </h4>

            <p className=" dark:text-white font-bold mb-2 mt-4" style={{ textAlign: 'justify', marginBottom: '1em' }}>
                Administrador
            </p>

            <p style={{ textAlign: 'justify', marginBottom: '1em' }}>
            Como director de la carrera de computación, el ingeniero Pablo Ordóñez 
            desempeña un papel clave en la administración de la aplicación web de 
            seguimiento al rendimiento estudiantil. Su posición le confiere la responsabilidad 
            de gestionar y supervisar todos los aspectos del sistema, garantizando una 
            operación eficiente y efectiva.
            </p>

            <p style={{ textAlign: 'justify', marginBottom: '1em' }}>
            En su rol como administrador, el ingeniero Pablo Ordóñez tiene la capacidad de ejecutar las siguientes funciones:
            </p>

            <p style={{ textAlign: 'justify', marginBottom: '1em' }}>
            Crear Periodos Académicos: Establecer y gestionar periodos académicos, 
            especificando fechas de inicio y fin, y asignar tanto a estudiantes como a docentes a estos periodos.
            </p>

            <p style={{ textAlign: 'justify', marginBottom: '1em' }}>
            Acceso a Gráficos de Rendimiento: Visualizar gráficos detallados que abarcan el 
            rendimiento de todas las materias en la carrera de computación, ofreciendo una perspectiva completa del progreso académico.
            </p>

            <p style={{ textAlign: 'justify', marginBottom: '1em' }}>
            Descargar Informes: Generar y descargar informes que detallan información 
            exhaustiva sobre el rendimiento de los estudiantes, facilitando una revisión y análisis profundos.
            </p>

            <p style={{ textAlign: 'justify', marginBottom: '1em' }}>
            Gestión de Roles: Asignar y quitar roles de administrador, 
            docente o personal de seguimiento a los usuarios, adaptando el sistema a las necesidades operativas y organizativas.
            </p>

            <p style={{ textAlign: 'justify', marginBottom: '1em' }}>
            Editar Información de Docentes: 
            Modificar los datos de los docentes, asegurando que la información esté actualizada y correcta.
            </p>

            <p style={{ textAlign: 'justify', marginBottom: '1em' }}>
            Visualización Completa: Acceder a la información de todas las materias y ciclos, 
            incluyendo estudiantes y notas, para una supervisión integral del rendimiento académico.
            </p>

            <p style={{ textAlign: 'justify', marginBottom: '1em' }}>
            
            </p>



            <h4 className="text-2xl dark:text-white font-bold mb-2 mt-4">
                Normativas por la Universidad
            </h4>
            <p className=" dark:text-white font-bold mb-2 mt-4" style={{ textAlign: 'justify', marginBottom: '1em' }}>
                Art. 202.- Seguimiento del desempeño estudiantil
            </p>

            <p style={{ textAlign: 'justify', marginBottom: '1em' }}>
                Es el conjunto de acciones
                que se ejecutan en las carreras universitarias para la recopilación de información
                que fundamente el análisis, reflexión y valoración cualitativa y cuantitativa sobre
                los resultados de aprendizaje que va logrando o no el estudiante.

            </p>

            <p style={{ textAlign: 'justify', marginBottom: '1em' }}>
                Se ejecuta a través del acompañamiento académico continuo que realiza el
                Director/a de carrera al logro de los resultados de aprendizaje del estudiante en
                las diferentes asignaturas, cursos o equivalentes. La responsabilidad podrá ser
                delegada a los integrantes del Consejo Académico Consultivo de carrera. Se
                asegurará, como parte de esta actividad, el desarrollo de las capacidades
                científico-técnicas y actitudinales del estudiante.

            </p>

            <p style={{ textAlign: 'justify', marginBottom: '1em' }}>
                El insumo fundamental de este proceso es el registro que lleva el docente sobre el
                cumplimiento y valoración de los productos de acreditación establecidos en el
                programa de estudios (sílabo) de la asignatura, curso o equivalente, en función
                del o los resultados de aprendizaje establecidos para cada una de las unidades
                didácticas o temas de estudio.
            </p>

            <p className=" dark:text-white font-bold mb-2 mt-4" style={{ textAlign: 'justify', marginBottom: '1em' }}>
                Art. 203.- Retroalimentación del desempeño estudiantil
            </p>

            <p style={{ textAlign: 'justify', marginBottom: '1em' }}>
                Es el conjunto de
                acciones que se ejecutan en las carreras universitarias para retroalimentar el
                desempeño del estudiante en cada una de las unidades didácticas o temas de
                estudio de las asignaturas, cursos o equivalentes y, se fundamenta en los
                resultados del seguimiento al desempeño estudiantil.
            </p>

            <p style={{ textAlign: 'justify', marginBottom: '1em' }}>
                Con base en el resultado del seguimiento al desempeño académico, se podrán
                coordinar acciones con los docentes, para aquellos estudiantes que no han
                logrado alcanzar los resultados de aprendizaje esperados. Las acciones estarán
                orientadas a contribuir a que el estudiante logre los conocimientos, capacidades y
                valores previstos en los resultados de aprendizaje de las unidades didácticas o
                temas de estudio de las diferentes asignaturas, cursos o equivalentes.
            </p>

            <p style={{ textAlign: 'justify', marginBottom: '1em' }}>
                Las
                acciones a implementarse podrán ser tutorías, envío de trabajos prácticos o
                autónomos, planteamiento y/o resolución de ejercicios o problemas de aplicación,
                entre otras y constarán en el formato que para el efecto elabore y emita el
                Vicerrector o Vicerrectora Académica o un delegado del Rector.
            </p>



            <p style={{ textAlign: 'justify', marginBottom: '1em' }}>

            </p>

        </div>
    );
};

export default PaginaInfoAdmin;
