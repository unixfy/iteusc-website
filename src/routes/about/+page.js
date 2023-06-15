import {collection, query, where, orderBy} from "firebase/firestore";
import {firestore} from "$lib/firebase/client.js";
import getFirestoreData from "$lib/firebase/getFirestoreData.js";

export async function load() {
    const list = await getFirestoreData(query(collection(firestore, 'team-members'), where('published', '==', true), orderBy('order', 'asc')));

    return {
        teamMembers: list,
        // Return the title for this page, which will be handled in the layout svelte file for SEO
        title: "About"
    }
}