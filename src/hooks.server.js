// this firebase config comes from the firebase console
import {redirect} from "@sveltejs/kit";
import {auth} from "$lib/firebase/server.server.js";

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

export async function handle({event, resolve}) {
    // set default if session cookie fails
    event.locals.user = null

    // get session cookie
    const session = event.cookies.get('iteusc-session')

    // if we're able to get the session cookie, verify the session with firebase
    if (session) {
        try {
            const user = await auth.verifySessionCookie(session)
            event.locals.user = user
        } catch (err) {
            console.log('Could not verify session cookie', err)
        }
    }

    // Secure the admin pages on the server side
    if (event.url.pathname.startsWith('/admin') && !event.locals.user) {
        throw redirect(302, '/auth/login');
    }

    if (event.url.pathname === '/auth/login' && event.locals.user) {
        throw redirect(302, '/admin');
    }

    return await resolve(event);
}
