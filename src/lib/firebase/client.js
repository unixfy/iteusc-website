import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getAnalytics} from "firebase/analytics";
import {
    PUBLIC_FIREBASE_PROJECT_ID,
    PUBLIC_FIREBASE_API_KEY,
    PUBLIC_FIREBASE_AUTH_DOMAIN,
    PUBLIC_FIREBASE_STORAGE_BUCKET,
    PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
    PUBLIC_FIREBASE_APP_ID,
} from "$env/static/public";

// Function to initialize Firebase client side app
function initApp() {
    // get existing initialized apps
    const apps = getApps();

    // if there's an existing init'd app then just return that instead of initing a new one
    if (apps.length > 0) {
        return apps[0];
    }

    return initializeApp({
        // initialize the firebase app using config details from env
        apiKey: PUBLIC_FIREBASE_API_KEY,
        authDomain: PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
        appId: PUBLIC_FIREBASE_APP_ID,
        databaseURL: `https://${PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`,
    })
}

// now return firebase client app instance, and auth for use in other components
export const firebase = initApp();
export const auth = getAuth(firebase);
export const firestore = getFirestore(firebase);
export const analytics = getAnalytics(firebase);