import {firestore} from "$lib/firebase/server.server.js";
import {fail} from "@sveltejs/kit";

export const actions = {
    create: async ({request, locals}) => {
        const data = await request.formData();
        const ref = firestore.collection('opportunities')

        try {
            // create new record in firestore
            await ref.add({
                name: data.get('title'),
                description: data.get('description'),
                published: (data.get('published') === "true"), // convert string to boolean
                createdAt: new Date(), // i.e., now
                updatedAt: new Date(), // i.e., now
                deadline: new Date(data.get('deadline')),
                url: data.get('url'),
                author: locals.user.uid,
            })
        } catch (error) {
            return fail(400, {error: error.toString()})
        }

        return {
            success: true
        }
    },

    delete: async ({request}) => {
        const data = await request.formData();
        const ref = firestore.doc(`opportunities/${data.get('id')}`);

        try {
            await ref.delete()
        } catch (error) {
            return fail(400, {error: error.toString()})
        }

        return {success: true}
    },
    edit: async ({request}) => {
        const data = await request.formData();

        const ref = firestore.doc(`opportunities/${data.get('id')}`);

        try {
            await ref.update({
                name: data.get('title'),
                description: data.get('description'),
                url: data.get('url'),
                deadline: new Date(Date.parse(data.get('deadline'))),
                published: (data.get('published') === "true"), // convert string to boolean
                updatedAt: new Date(), // i.e., now
            })
        } catch (error) {
            return fail(400, {error: error.toString()})
        }

        return {
            success: true
        }
    }
}