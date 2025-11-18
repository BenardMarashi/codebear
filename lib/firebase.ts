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

// 🔥 CRITICAL FIX: Initialize Firebase ONLY on client-side!
// Firebase Client SDK cannot run during server-side rendering
let app: FirebaseApp | undefined;
let db: Firestore | undefined;
let auth: Auth | undefined;

if (typeof window !== 'undefined') {
  // We're on the client - safe to initialize Firebase
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  db = getFirestore(app);
  auth = getAuth(app);
  
  if (process.env.NODE_ENV === 'development') {
    console.log('✅ Firebase initialized on client');
  }
} else {
  // We're on the server - don't initialize
  if (process.env.NODE_ENV === 'development') {
    console.log('⚠️ Firebase not initialized (server-side render)');
  }
}

// Analytics - only initialize on client side
export const getAnalyticsInstance = () => {
  if (typeof window !== 'undefined' && app) {
    return getAnalytics(app);
  }
  return null;
};

// Export - these will be undefined on server, defined on client
// Your components should check if they're defined before using them
export { db, auth, app };
export default app;