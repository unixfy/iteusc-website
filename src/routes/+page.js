import {collection, orderBy, query, where, limit} from "firebase/firestore";
import {firestore} from "$lib/firebase/client.js";
import getFirestoreData from "$lib/firebase/getFirestoreData.js";

export async function load() {
    const projectsList = getFirestoreData(query(collection(firestore, 'projects'), where('published', '==', true), limit(3)))
    const imageGridList = getFirestoreData(query(collection(firestore, 'image-grid'), where('published', '==', true), orderBy('order', 'asc'), limit(6)))

    return {
        // Return the title for this page, which will be handled in the layout svelte file for SEO
        title: "Home",
        projects: projectsList,
        imageGrid: imageGridList
    }
}