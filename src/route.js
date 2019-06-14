import React from 'react';

const SignIn1 = React.lazy(() => import('./Demo/Authentication/SignIn/SignIn1'));

const route = [
    { path: '/auth/signin-1', exact: true, name: 'Signin 1', component: SignIn1 }
];

export default route;