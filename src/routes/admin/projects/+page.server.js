import {firestore, storage} from "$lib/firebase/server.server.js";
import {fail} from "@sveltejs/kit";

export const actions = {
    create: async ({request, locals}) => {
        const data = await request.formData();
        const ref = firestore.collection('projects')
        // the path in our firebase storage bucket where we want to store the image
        const imagePath = `images/projects/${data.get("imageFile").name}`

        try {
            // note that the GCloud SDK only takes Buffer or Uint8Array, so we need to convert the file to a Uint8Array
            const bytes = new Uint8Array(await data.get('imageFile').arrayBuffer())

            // upload the image to our bucket
            await storage.file(imagePath).save(bytes)

            // create new record in firestore
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
            // delete our image from the firebase storage bucket first
            await storage.file(data.get("image")).delete()
            // then delete the record from Firestore
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