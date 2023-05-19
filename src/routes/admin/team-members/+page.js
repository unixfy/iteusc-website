import {firestore} from "$lib/firebase/client";
import {collection, getDocs, orderBy, query} from "firebase/firestore";

export async function load() {
    // Create reference to 'projects' collection in Firestore
    const ref = query(collection(firestore, 'team-members'), orderBy('order', 'asc'));

    // this array will be filled up with all our data by our Firebase query
    let list = [];

    // Query all projects from the collection
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
        title: "Team Members Admin"
    }
}