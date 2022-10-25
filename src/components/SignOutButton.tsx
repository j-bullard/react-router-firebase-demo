import { ActionFunction, redirect, useFetcher } from 'react-router-dom';

import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const action: ActionFunction = async () => {
  await signOut(auth).then(() => redirect('/login'));
};

export const SignOutButton = () => {
  const fetcher = useFetcher();

  const handleSignOut = () =>
    fetcher.submit(null, { method: 'post', action: '/signout' });

  return (
    <>
      <button onClick={handleSignOut}>Sign-out</button>
    </>
  );
};

export default SignOutButton;
