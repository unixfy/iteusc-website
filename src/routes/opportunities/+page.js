import {firestore} from "$lib/firebase/client";
import {collection, where, query} from "firebase/firestore";
import getFirestoreData from "$lib/firebase/getFirestoreData.js";

export async function load() {
    const list = getFirestoreData(query(collection(firestore, 'opportunities'), where('published', '==', true)))

    return {
        opportunities: list,
        title: "Opportunities"
    }
}