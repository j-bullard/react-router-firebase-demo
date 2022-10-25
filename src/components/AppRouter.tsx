import DemoApp, { loader as demoAppLoader } from './DemoApp';
import Login, { loginAction, loginLoader } from './Login';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { signOutAction, signOutLoader } from '../routes/signout';

import EmailSent from './EmailSent';

export const AppRouter = () => {
  return (
    <>
      <RouterProvider
        router={createBrowserRouter([
          {
            path: '/',
            element: <DemoApp />,
            loader: demoAppLoader,
          },
          {
            path: '/login',
            element: <Login />,
            loader: loginLoader,
            action: loginAction,
          },
          {
            path: '/sent',
            element: <EmailSent />,
          },

          // This is just a route - no component.
          {
            path: '/signout',
            action: signOutAction,
            loader: signOutLoader,
          },
        ])}
      />
    </>
  );
};

export default AppRouter;
