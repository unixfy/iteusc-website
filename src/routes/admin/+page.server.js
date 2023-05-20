import {auth} from "$lib/firebase/server.server.js";
import {fail} from "@sveltejs/kit";

export async function load({locals}) {
    return {
        user: locals.user,
        title: "Admin Page",
        // Do not allow search engines to index this page
        noIndex: true
    }
}

export const actions = {
    updateUser: async ({request, locals}) => {
        const data = await request.formData();

        // We define userUpdatedProperties separately to allow the "password" field to be blank if the user doesn't want to change their password
        // That way we never have to expose the user's password to the frontend
        const userUpdatedProperties = {
            email: data.get('email'),
        }

        if (data.get('password')) {
            userUpdatedProperties.password = data.get('password')
        }

        try {
            // Use the Firebase Admin SDK to update the user
            await auth.updateUser(locals.user.uid, userUpdatedProperties)
        } catch (error) {
            return fail(400, {error: error.toString()})
        }

        return {
            success: true
        }
    }
}