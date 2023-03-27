import {auth} from '$lib/firebase/server.server';
import {json} from '@sveltejs/kit'
import {getSession} from '$lib/firebase/getSession'

// this POST handler receives client-side auth token, checks it w/ firebase, and sets a cookie for future requests to this server
export async function POST({request, cookies}) {
    const token = await request.text()

    // verify the token with firebase admin
    const user = await auth.verifyIdToken(token)

    // create a session cookie
    const sessionCookie = await auth.createSessionCookie(token, {expiresIn: 1000 * 60 * 60 * 24 * 7}) // 7 days

    // configure options (i.e., http only, expire after 7 days, secure)
    const options = {maxAge: 60 * 60 * 24 * 7, httpOnly: true, secure: true, sameSite: 'lax', path: '/'} // 7 days

    // set the cookie
    cookies.set('iteusc-session', sessionCookie, options)

    // return the user object
    return json(getSession(user))
}

// this DELETE handler clears the cookie
export async function DELETE({cookies}) {
    // clear the cookie
    // note that it is VERY important to specify the path here, otherwise nothing will work ;-)
    cookies.set('iteusc-session', '', {maxAge: 0, path: '/'})
    return json(getSession(null))
}