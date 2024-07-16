import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
    exact: true
  },
  {
    path: '/API',
    component: ComponentCreator('/API', '769'),
    exact: true
  },
  {
    path: '/blog',
    component: ComponentCreator('/blog', 'b2f'),
    exact: true
  },
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive', '182'),
    exact: true
  },
  {
    path: '/blog/first-blog-post',
    component: ComponentCreator('/blog/first-blog-post', '89a'),
    exact: true
  },
  {
    path: '/blog/long-blog-post',
    component: ComponentCreator('/blog/long-blog-post', '9ad'),
    exact: true
  },
  {
    path: '/blog/mdx-blog-post',
    component: ComponentCreator('/blog/mdx-blog-post', 'e9f'),
    exact: true
  },
  {
    path: '/blog/tags',
    component: ComponentCreator('/blog/tags', '287'),
    exact: true
  },
  {
    path: '/blog/tags/docusaurus',
    component: ComponentCreator('/blog/tags/docusaurus', '704'),
    exact: true
  },
  {
    path: '/blog/tags/facebook',
    component: ComponentCreator('/blog/tags/facebook', '858'),
    exact: true
  },
  {
    path: '/blog/tags/hello',
    component: ComponentCreator('/blog/tags/hello', '299'),
    exact: true
  },
  {
    path: '/blog/tags/hola',
    component: ComponentCreator('/blog/tags/hola', '00d'),
    exact: true
  },
  {
    path: '/blog/welcome',
    component: ComponentCreator('/blog/welcome', 'd2b'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '44b'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '959'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', '938'),
            routes: [
              {
                path: '/docs/category/controladores-dao-de-modelos',
                component: ComponentCreator('/docs/category/controladores-dao-de-modelos', '105'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/category/modelos',
                component: ComponentCreator('/docs/category/modelos', '3b0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/intro',
                component: ComponentCreator('/docs/intro', '61d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/modulo-proyeccion/ModeloCalificacion',
                component: ComponentCreator('/docs/modulo-proyeccion/ModeloCalificacion', 'c0e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/modulo-proyeccion/ModeloCursa',
                component: ComponentCreator('/docs/modulo-proyeccion/ModeloCursa', 'c26'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/modulo-proyeccion/ModeloDocente',
                component: ComponentCreator('/docs/modulo-proyeccion/ModeloDocente', '12f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/modulo-proyeccion/ModeloEstudiante',
                component: ComponentCreator('/docs/modulo-proyeccion/ModeloEstudiante', '6a3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/modulo-proyeccion/ModeloMateria',
                component: ComponentCreator('/docs/modulo-proyeccion/ModeloMateria', '0c4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/modulo-proyeccion/ModeloPeriodo',
                component: ComponentCreator('/docs/modulo-proyeccion/ModeloPeriodo', 'df7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/modulo-proyeccion/ModeloRubrica',
                component: ComponentCreator('/docs/modulo-proyeccion/ModeloRubrica', 'e2b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/modulo-proyeccion/ModeloUnidad',
                component: ComponentCreator('/docs/modulo-proyeccion/ModeloUnidad', '13c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/modulo-proyeccion/ModeloUsuario',
                component: ComponentCreator('/docs/modulo-proyeccion/ModeloUsuario', 'b0b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/tutorial-extras/CalificacionDaoControl',
                component: ComponentCreator('/docs/tutorial-extras/CalificacionDaoControl', '4a4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/tutorial-extras/CursaDaoControl',
                component: ComponentCreator('/docs/tutorial-extras/CursaDaoControl', '53d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/tutorial-extras/DocenteDaoContro',
                component: ComponentCreator('/docs/tutorial-extras/DocenteDaoContro', 'fe1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/tutorial-extras/EstudianteDaoControl',
                component: ComponentCreator('/docs/tutorial-extras/EstudianteDaoControl', '387'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/tutorial-extras/MateriaDaoControl',
                component: ComponentCreator('/docs/tutorial-extras/MateriaDaoControl', '726'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/tutorial-extras/PeriodoDaoControl',
                component: ComponentCreator('/docs/tutorial-extras/PeriodoDaoControl', 'a8e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/tutorial-extras/RubricaDaoControl',
                component: ComponentCreator('/docs/tutorial-extras/RubricaDaoControl', '9ff'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/tutorial-extras/UnidadDaoControl',
                component: ComponentCreator('/docs/tutorial-extras/UnidadDaoControl', 'fd9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/tutorial-extras/UsuarioDaoControl',
                component: ComponentCreator('/docs/tutorial-extras/UsuarioDaoControl', '3ea'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', '2e1'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
