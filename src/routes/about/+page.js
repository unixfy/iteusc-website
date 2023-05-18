import {collection, getDocs, query, where, orderBy} from "firebase/firestore";
import {firestore} from "$lib/firebase/client.js";

export async function load() {
    // Create reference to 'team-members' collection in Firestore
    // Ordered by the "order" field (smallest first)
    const ref = query(collection(firestore, 'team-members'), where('published', '==', true), orderBy('order', 'asc'));

    // this array will be filled up with all our data by our Firebase query
    let list = [];

    // Query all team members from the collection
    let documents = await getDocs(ref);

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
        // Return the title for this page, which will be handled in the layout svelte file for SEO
        title: "About"
    }
}