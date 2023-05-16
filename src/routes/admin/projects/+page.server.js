import {firestore, storage} from "$lib/firebase/server.server.js";
import {fail} from "@sveltejs/kit";

export const actions = {
    create: async ({request, locals}) => {
        const data = await request.formData();
        const ref = firestore.collection('projects')
        const imagePath = `images/projects/${data.get("imageFile").name}`

        try {
            // note that the GCloud SDK only takes Buffer or Uint8Array, so we need to convert the file to a Uint8Array
            const bytes = new Uint8Array(await data.get('imageFile').arrayBuffer())

            await storage.file(imagePath).save(bytes)

            await ref.add({
                name: data.get('title'),
                description: data.get('description'),
                published: (data.get('published') === "true"), // convert string to boolean
                createdAt: new Date(), // i.e., now
                updatedAt: new Date(), // i.e., now
                author: locals.user.uid,
                // we just store the path to our image in the bucket, NOT the direct url
                image: imagePath
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
        const ref = firestore.doc(`projects/${data.get('id')}`);

        try {
            await ref.delete()
        } catch (error) {
            return fail(400, {error: error.toString()})
        }

        return {success: true}
    },
    edit: async ({request}) => {
        const data = await request.formData();

        const ref = firestore.doc(`projects/${data.get('id')}`);

        try {
            await ref.update({
                name: data.get('title'),
                description: data.get('description'),
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