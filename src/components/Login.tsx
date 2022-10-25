import {
  ActionFunction,
  Form,
  LoaderFunction,
  json,
  redirect,
  useLoaderData,
  useNavigation,
} from 'react-router-dom';
import {
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
} from 'firebase/auth';

import { FirebaseError } from 'firebase/app';
import { auth } from '../firebase';

export const loginLoader: LoaderFunction = async ({ request }) => {
  if (!isSignInWithEmailLink(auth, request.url)) {
    return null;
  }

  // Get email from storage
  const email = localStorage.getItem('email');

  // If no email return an error
  if (!email) {
    return json({
      status: 'error',
      code: 'auth/invalid-link',
      message:
        'The link has expired or no matching token was found on the local machine.',
    });
  }

  return await signInWithEmailLink(auth, email, request.url)
    .then(() => {
      localStorage.removeItem('email');
      return redirect('/');
    })
    .catch((error: FirebaseError) => {
      return json({ ...error });
    });
};

export const loginAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get('email')?.toString();

  try {
    sendSignInLinkToEmail(auth, email!, {
      url: `${window.location.href}`,
      handleCodeInApp: true,
    });

    localStorage.setItem('email', email);

    return redirect('/sent');
  } catch (error: unknown) {
    return json(error);
  }
};

export const Login = () => {
  const navigation = useNavigation();
  const error = useLoaderData();

  return (
    <>
      {error && <div style={{ color: 'red' }}>{JSON.stringify(error)}</div>}

      <Form method='post'>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            name='email'
            required
            autoComplete='email'
          />
        </div>

        <button type='submit' disabled={navigation.state !== 'idle'}>
          {navigation.state === 'idle' ? 'Send email' : 'Sent'}
        </button>
      </Form>
    </>
  );
};

export default Login;
