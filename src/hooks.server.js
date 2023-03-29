// this firebase config comes from the firebase console
import {redirect} from "@sveltejs/kit";
import {auth} from "$lib/firebase/server.server.js";

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
