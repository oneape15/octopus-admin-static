export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './system/login',
      },
    ],
  },
  {
    path: '/',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    icon: 'smile',
    component: './dashboard',
  },
  {
    path: '/system',
    name: 'system',
    icon: 'crown',
    routes: [
      {
        path: '/system/org',
        name: 'org',
      },
      {
        path: '/system/role',
        name: 'role',
        component: './system/role'
      },
      {
        path: '/system/resource',
        name: 'resource',
        component: './system/resource'
      },
      {
        path: '/system/user',
        name: 'user',
        component: './system/user'
      },
    ]
  },
  {
    path: '/dw',
    name: 'dw',
    icon: 'crown',
    routes: [
      {
        path: '/dw/datasource',
        name: 'datasource',
        component: './dw/datasource'
      },
      {
        path: '/dw/term',
        name: 'term',
      },
      {
        path: '/dw/dataindex',
        name: 'dataindex'
      },
    ]
  },
  {
    path: '/serve',
    name: 'serve',
    icon: 'crown',
    routes: [
      {
        path: '/serve/list',
        name: 'list',
        component: './serve/manage'
      },
      {
        path: '/serve/registrar',
        name: 'registrar'
      }
    ]
  },
  {
    path: '/fetch',
    name: 'fetch',
    icon: 'table',
    routes: [
      {
        path: '/fetch/model',
        name: 'model',
        component: './fetch/model',
      },
      {
        path: '/fetch/label',
        name: 'label',
      },
      {
        path: '/fetch/selfhelp',
        name: 'selfhelp',
      },
      {
        path: '/fetch/manual',
        name: 'manual',
      },
    ]
  },
  {
    path: '/job',
    name: 'job',
    icon: 'table',
    routes: [
      {
        path: '/job/list',
        name: 'jobManage'
      }
    ]
  },
  {
    component: './404',
  },
];