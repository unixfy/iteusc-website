// this firebase config comes from the firebase console
import {initializeApp} from "firebase/app";
import {getDatabase} from "firebase/database";
import {getAuth} from "firebase/auth";
import {redirect} from "@sveltejs/kit";

const firebaseConfig = {
    apiKey: "AIzaSyCPPaxyqvEpYaeyhOlUZ0W9dmfROW4trpc",
    authDomain: "la-ite-micromobility.firebaseapp.com",
    databaseURL: "https://la-ite-micromobility.firebaseio.com",
    projectId: "la-ite-micromobility",
    storageBucket: "la-ite-micromobility.appspot.com",
    messagingSenderId: "700577241231",
    appId: "1:700577241231:web:dd3e750779407e050df8fa",
    measurementId: "G-PPZH80P5TQ"
};

// initialize firebase (needed to do anything w firebase)
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export async function handle({event, resolve}) {
    // Secure the admin pages on the server side
    if (event.url.pathname.startsWith('/admin') && !auth.currentUser) {
        throw redirect(301, '/auth/login');
    }

    // Grab the current user + db interface, which will be passed to all load() child functions
    event.locals.user = auth.currentUser;
    event.locals.auth = auth;
    event.locals.database = database;

    return await resolve(event);
}
