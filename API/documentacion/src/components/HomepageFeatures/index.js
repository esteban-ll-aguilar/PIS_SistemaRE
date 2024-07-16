import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Documentacion del PIS',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        La presente documentacion tiene como objetivo brindar informacion sobre el PIS, su funcionamiento y uso. donde se detallan los procesos y funciones que se pueden realizar en el sistema.
      </>
    ),
  },
  {
    title: 'Utilidad de la documentacion',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        La documentacion es una guia para el programador donde se describe el uso de los modelos, controladores y estructura de datos
        utilizada en el sistema. 
      </>
    ),
  },
  {
    title: 'Herramientas de desarrollo',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        El sistema fue desarrollado con tecnologias modernas como React, NodeJS, Oracle 21c, Python, entre otras.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
