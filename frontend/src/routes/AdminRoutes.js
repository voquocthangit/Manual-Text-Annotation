import React from 'react';

const AdminDashboard = React.lazy(() => import('../views/Dashboard/AdminDashboard')); 
const Users = React.lazy(() => import('../views/Page/Users/Users')); 


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/projects', exact: true, name: 'Home',component:AdminDashboard },  
  { path: '/users',  exact: true, name: 'Users', component: Users },

];

export default routes;
