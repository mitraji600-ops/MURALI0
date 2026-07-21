import { getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

if (!getApps().length) {
  // In environments like AI Studio or GCP, application default credentials can be used.
  // Alternatively, the token can be verified using the project ID.
  initializeApp({
    projectId: process.env.FIREBASE_PROJECT_ID || 'gen-lang-client-0721554381',
  });
}

export const adminAuth = getAuth();
export const adminDb = getFirestore();
