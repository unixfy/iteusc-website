import {signOut} from "firebase/auth";
import {redirect} from "@sveltejs/kit";

export async function load({locals}) {
    const auth = locals.auth;

    signOut(auth).then(() => {
    }).catch((error) => {
        console.log(error)
    });

    throw redirect(302, '/auth/login');

    return {
        // Do not allow search engines to index this page
        noIndex: true
    }
}