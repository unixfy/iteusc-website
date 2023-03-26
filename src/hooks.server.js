// this firebase config comes from the firebase console
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { redirect } from "@sveltejs/kit";

// const firebaseConfig = {
//     apiKey: "AIzaSyCIuUd1ZWu4uUUeGCMg4kIcBNecBQqhMtU",
//     authDomain: "iteusc-website.firebaseapp.com",
//     projectId: "iteusc-website",
//     storageBucket: "iteusc-website.appspot.com",
//     messagingSenderId: "820731032494",
//     appId: "1:820731032494:web:7170035146406e6fafce3f"
// };

// // initialize firebase (needed to do anything w firebase)
// const app = initializeApp(firebaseConfig);
// const database = getDatabase(app);
// const auth = getAuth(app);

export async function handle({ event, resolve }) {
    // Secure the admin pages on the server side
    if (event.url.pathname.startsWith('/admin') && !auth.currentUser) {
        throw redirect(302, '/auth/login');
    }

    // Grab the current user + db interface, which will be passed to all load() child functions
    // event.locals.user = auth.currentUser;
    // event.locals.auth = auth;
    // event.locals.database = database;

    return await resolve(event);
}
