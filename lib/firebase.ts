import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase ONLY on client-side
let app: FirebaseApp | undefined;
let firestoreDb: Firestore | undefined;
let firebaseAuth: Auth | undefined;

if (typeof window !== 'undefined') {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  firestoreDb = getFirestore(app);
  firebaseAuth = getAuth(app);
  
  if (process.env.NODE_ENV === 'development') {
    console.log('✅ Firebase initialized on client');
  }
}

// Helper functions that throw errors if called on server
export function getDb(): Firestore {
  if (!firestoreDb) {
    throw new Error('Firestore not initialized. Make sure you are on the client side.');
  }
  return firestoreDb;
}

export function getAuthInstance(): Auth {
  if (!firebaseAuth) {
    throw new Error('Auth not initialized. Make sure you are on the client side.');
  }
  return firebaseAuth;
}

// Analytics - only initialize on client side
export const getAnalyticsInstance = () => {
  if (typeof window !== 'undefined' && app) {
    return getAnalytics(app);
  }
  return null;
};

// Export the raw instances (can be undefined)
export const db = firestoreDb;
export const auth = firebaseAuth;

export default app;