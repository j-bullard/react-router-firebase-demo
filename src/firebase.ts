import {
  User,
  connectAuthEmulator,
  getAuth,
  onAuthStateChanged,
} from 'firebase/auth';
import { getApp, getApps, initializeApp } from 'firebase/app';

import { FirebaseOptions } from 'firebase/app';

export const firebaseOptions: FirebaseOptions = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  appId: '',
};

// Get existing app or initialize a new one
const app = getApps().length !== 0 ? getApp() : initializeApp(firebaseOptions);

// We need the app to continue
if (!app) {
  throw new Error('Unable to initialize the application.');
}

// Get auth instance
const auth = getAuth(app);

// We need these to continue
if (!auth) {
  throw new Error('An error occurred while initializing services.');
}

// Connect to emulators for dev
if (import.meta.env.DEV) {
  connectAuthEmulator(auth, 'http://localhost:9099', {
    disableWarnings: false,
  });
}

/**
 * Returns a promise that resolves to a user
 *
 * https://firebase.google.com/docs/auth/web/service-worker-sessions#service_worker_changes
 */
const requireUser = async (): Promise<User> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // Call here do prevent from listening further
      unsubscribe();

      if (user !== null) {
        /**
         * Could also get user record from firestore, check claims, etc.
         * before resolving
         */
        resolve(user);
      }

      reject('User is not signed in');
    });
  });
};

// Exports
export { app, auth, requireUser };
