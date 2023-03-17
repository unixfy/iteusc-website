import {fail, redirect} from "@sveltejs/kit";
import {signInWithEmailAndPassword} from "firebase/auth";

export async function load({locals}) {
    if (locals.user) {
        throw redirect(302, '/admin');
    }
}

export const actions = {
    default: async (event) => {
        const data = await event.request.formData();

        signInWithEmailAndPassword(event.locals.auth, data.get('username'), data.get('password')).then((userCredential) => {
            console.log('success')
            return {
                success: true
            }
        }).catch((error) => {
            return fail(400, error.message);
        });
    }
}