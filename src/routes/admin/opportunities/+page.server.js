import {firestore} from "$lib/firebase/server.server.js";
import {fail} from "@sveltejs/kit";

export async function load() {
    // Create reference to 'opportunities' collection in Firestore
    const ref = firestore.collection('opportunities');

    // this array will be filled up with all our data by our Firebase query
    let list = [];

    // Query all opportunities from the collection
    let documents = await ref.get();

    for (const doc of documents.docs) {
        // firebase firestore is a bit stupid, so we need to iterate over every. single. child. and get details from there :/
        // iterate over each opportunity, grab its data, and append it to list
        const item = doc.data();

        // Grab ID from document too
        item.id = doc.id;

        // must transform timestamp fields in our DB on our own, explicitly
        item.deadline = item.deadline.toDate();
        item.createdAt = item.createdAt.toDate();
        item.updatedAt = item.updatedAt.toDate();

        // Force stringify everything with JSON before returning to prevent any non-POJOs that get through and cause 500s
        list.push(JSON.parse(JSON.stringify(item)));
    }

    return {
        opportunities: list,
        title: "Opportunities Admin"
    }
}

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