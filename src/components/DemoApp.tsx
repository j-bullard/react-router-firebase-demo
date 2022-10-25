import { LoaderFunction, redirect } from 'react-router-dom';

import SignOutButton from './SignOutButton';
import { requireUser } from '../firebase';

export const loader: LoaderFunction = async () => {
  return await requireUser()
    .then((user) => user)
    .catch(() => redirect('/login'));
};

export const DemoApp = () => {
  return (
    <>
      <h1>Hooray! You are logged in!</h1>
      <SignOutButton />
    </>
  );
};

export default DemoApp;
