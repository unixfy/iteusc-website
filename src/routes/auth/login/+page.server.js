import {fail, redirect} from "@sveltejs/kit";
import {signInWithEmailAndPassword} from "firebase/auth";

export async function load({locals}) {
    if (locals.user) {
        throw redirect(302, '/admin');
    }
    return {
        // Do not allow search engines to index this page
        noIndex: true
    }
}