import { ActionFunction, LoaderFunction, redirect } from 'react-router-dom';

import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

export const signOutAction: ActionFunction = async ({ request }) => {
  return await signOut(auth).then(() => redirect('/login'));
};

export const signOutLoader: LoaderFunction = async () => {
  return await signOut(auth).then(() => redirect('/login'));
};
