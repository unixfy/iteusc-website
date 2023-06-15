import {onIdTokenChanged, getIdToken} from 'firebase/auth'
import {auth} from "$lib/firebase/client.js";

onIdTokenChanged(auth, async user => {
    // set or clear the session using the user state / idToken
    const req = user
        ? fetch('/auth/session', {
            method: 'post',
            body: await getIdToken(user),
        })
        : fetch('/auth/session', {
            method: 'delete'
        })
    await req
})