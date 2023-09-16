import {firestore} from "$lib/firebase/client";
import {collection, where, query} from "firebase/firestore";
import getFirestoreData from "$lib/firebase/getFirestoreData.js";

export async function load() {
    const list = getFirestoreData(query(collection(firestore, 'hall-of-fame'), where('published', '==', true)))

    return {
        items: list,
        title: "Hall of Fame"
    }
}