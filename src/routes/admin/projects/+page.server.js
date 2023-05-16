import {firestore} from "$lib/firebase/server.server.js";
import {fail} from "@sveltejs/kit";

export const actions = {
    create: async ({request, locals}) => {
        const data = await request.formData();
        const ref = firestore.collection('projects')

        ref.add({
            name: data.get('title'),
            description: data.get('description'),
            published: (data.get('published') === "true"), // convert string to boolean
            createdAt: new Date(), // i.e., now
            updatedAt: new Date(), // i.e., now
            author: locals.user.uid,
            image: "https://storage.googleapis.com"
        }).then(() => {
            return {
                success: true
            }
        }).catch((error) => {
            return fail(400, {error: error})
        })
    },
    delete: async ({request}) => {
        const data = await request.formData();
        const ref = firestore.doc(`projects/${data.get('id')}`);
        ref.delete().then(() => {
            return {
                success: true
            }
        }).catch((error) => {
            return fail(400, {error: error})
        })
    },
    edit: async ({request}) => {
        const data = await request.formData();

        const ref = firestore.doc(`projects/${data.get('id')}`);
        ref.update({
            name: data.get('title'),
            description: data.get('description'),
            published: (data.get('published') === "true"), // convert string to boolean
            updatedAt: new Date(), // i.e., now
        }).then(() => {
            return {
                success: true
            }
        }).catch((error) => {
            return fail(400, {error: error})
        })
    }
}