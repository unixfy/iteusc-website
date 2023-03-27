import {getSession} from '$lib/firebase/getSession'

export async function load({locals}) {
    // locals.user has the user, but could be blank if not logged in
    const {user} = locals
    const session = getSession(user)
    return {session}
}