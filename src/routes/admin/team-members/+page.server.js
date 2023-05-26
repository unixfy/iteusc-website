import {firestore, storage} from "$lib/firebase/server.server.js";
import {fail} from "@sveltejs/kit";

export async function load() {
    // Create reference to 'projects' collection in Firestore
    const ref = firestore.collection('team-members').orderBy('order', 'asc');

    // this array will be filled up with all our data by our Firebase query
    let list = [];

    // Query all projects from the collection
    let documents = await ref.get();

    for (const doc of documents.docs) {
        // firebase firestore is a bit stupid, so we need to iterate over every. single. child. and get details from there :/
        // iterate over each opportunity, grab its data, and append it to list
        const item = doc.data();

        // Grab ID from document too
        item.id = doc.id;

        // must transform timestamp fields in our DB on our own, explicitly
        item.createdAt = item.createdAt.toDate();
        item.updatedAt = item.updatedAt.toDate();

        // Force stringify everything with JSON before returning to prevent any non-POJOs that get through and cause 500s
        list.push(JSON.parse(JSON.stringify(item)));
    }

    return {
        members: list,
        title: "Team Members Admin"
    }
}

export const actions = {
    create: async ({request, locals}) => {
        const data = await request.formData();
        const ref = firestore.collection('team-members')
        // the path in our firebase storage bucket where we want to store the image
        const imagePath = `images/team-members/${data.get("imageFile").name}`

        try {
            // note that the GCloud SDK only takes Buffer or Uint8Array, so we need to convert the file to a Uint8Array
            const bytes = new Uint8Array(await data.get('imageFile').arrayBuffer())

            // upload the image to our bucket
            await storage.file(imagePath).save(bytes)

            // create new record in firestore
            await ref.add({
                name: data.get('name'),
                major: data.get('major'),
                hometown: data.get('hometown'),
                published: (data.get('published') === "true"), // convert string to boolean
                createdAt: new Date(), // i.e., now
                updatedAt: new Date(), // i.e., now
                author: locals.user.uid,
                order: parseInt(data.get('order')),
                role: data.get('role'),
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
        const ref = firestore.doc(`team-members/${data.get('id')}`);
        const doc = await ref.get();

        try {
            // delete our image from the firebase storage bucket first
            await storage.file(doc.get("image")).delete()
            // then delete the record from Firestore
            await ref.delete()
        } catch (error) {
            return fail(400, {error: error.toString()})
        }

        return {success: true}
    },
    edit: async ({request}) => {
        const data = await request.formData();

        const ref = firestore.doc(`team-members/${data.get('id')}`);

        try {
            await ref.update({
                name: data.get('name'),
                major: data.get('major'),
                hometown: data.get('hometown'),
                published: (data.get('published') === "true"), // convert string to boolean
                updatedAt: new Date(), // i.e., now
                order: parseInt(data.get('order')),
                role: data.get('role'),
            })
        } catch (error) {
            return fail(400, {error: error.toString()})
        }

        return {
            success: true
        }
    }
}