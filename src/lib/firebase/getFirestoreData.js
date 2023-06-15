import {getDocs} from "firebase/firestore";

export default async function (query) {
//     Grabs documents from a Firestore query and returns them as an array of objects
//     :param query: Firestore Query object

    // this array will be filled up with all our data by our Firebase query
    let list = [];

    // Query all projects from the collection
    let documents = await getDocs(query);

    for (const doc of documents.docs) {
        // firebase firestore is a bit stupid, so we need to iterate over every. single. child. and get details from there :/
        // iterate over each opportunity, grab its data, and append it to list
        const item = doc.data();

        // Grab ID from document too
        item.id = doc.id;

        // must transform timestamp fields in our DB on our own, explicitly, if they exist
        if (item.deadline) {
            item.deadline = item.deadline.toDate();
        }

        if (item.createdAt) {
            item.createdAt = item.createdAt.toDate();
        }

        if (item.updatedAt) {
            item.updatedAt = item.updatedAt.toDate();
        }

        // Force stringify everything with JSON before returning to prevent any non-POJOs that get through and cause 500s
        list.push(JSON.parse(JSON.stringify(item)));
    }

    return list
}