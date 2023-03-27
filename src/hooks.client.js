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
    const res = await req

    // we use this only if we actually need to get the response, which we don't
    // const data = await res.json()
})