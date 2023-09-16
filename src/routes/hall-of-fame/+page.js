import {firestore} from "$lib/firebase/client";
import {collection, where, query, orderBy} from "firebase/firestore";
import getFirestoreData from "$lib/firebase/getFirestoreData.js";

export async function load() {
    const list = getFirestoreData(query(collection(firestore, 'hall-of-fame'), where('published', '==', true), orderBy('order', 'asc')))

    return {
        items: list,
        title: "Hall of Fame"
    }
}