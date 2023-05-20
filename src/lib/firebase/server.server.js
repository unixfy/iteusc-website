import {getApps, initializeApp, cert} from "firebase-admin/app";
import {getStorage} from "firebase-admin/storage";
import {getFirestore} from "firebase-admin/firestore";
import {getAuth} from "firebase-admin/auth";
import {
    FIREBASE_ADMIN_PRIVATE_KEY,
    FIREBASE_ADMIN_CLIENT_EMAIL,
} from "$env/static/private";
import {PUBLIC_FIREBASE_PROJECT_ID, PUBLIC_FIREBASE_STORAGE_BUCKET} from "$env/static/public";

// Function to initialize Firebase app
function initApp() {
    // get existing initialized apps
    const apps = getApps();

    // if there's an existing init'd app then just return that instead of initing a new one
    if (apps.length > 0) {
        return apps[0];
    }

    return initializeApp({
        // allows us to initiailize the admin SDK with our service account, without having to upload the default JSON file
        // with private key that Firebase generates for a service account
        credential: cert({
            privateKey: FIREBASE_ADMIN_PRIVATE_KEY,
            clientEmail: FIREBASE_ADMIN_CLIENT_EMAIL,
            projectId: PUBLIC_FIREBASE_PROJECT_ID
        }),
        // databse URL for Cloud Firestore
        databaseURL: `https://${PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`,
        storageBucket: PUBLIC_FIREBASE_STORAGE_BUCKET,
    })
}

// now return firebase admin app instance, auth, and firestore for use in other components
export const firebase = initApp();
export const auth = getAuth();
// see reference for the firestore sdk here: https://googleapis.dev/nodejs/firestore/latest/Firestore.html
export const firestore = getFirestore();
// note that this bucket instance can be interacted with using the methods from the Google Cloud SDK - NOT the Firebase storage SDK (which is for client side)
export const storage = getStorage().bucket();