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

export const actions = {
    default: async (event) => {
        const data = await event.request.formData();

        try {
            await signInWithEmailAndPassword(event.locals.auth, data.get('username'), data.get('password'));
        } catch (error) {
            return fail(400, {error: true, message: error.message});
        }

        throw redirect(302, '/admin');
    }
}