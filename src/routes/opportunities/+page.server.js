import {firestore} from "$lib/firebase/server.server";

export async function load() {
    // Create reference to 'opportunities' collection in Firestore
    const opportunitiesRef = firestore.collection('opportunities');

    // this array will be filled up with all our opportunities by our Firebase query
    let opportunitiesList = [];

    // Query our PUBLISHED opportunities from the collection
    let opportunitiesQuery = await opportunitiesRef.where('published', '==', true).get();

    for (const doc of opportunitiesQuery.docs) {
        console.log(doc)
        // firebase firestore is a bit stupid, so we need to iterate over every. single. child. and get details from there :/
        // iterate over each opportunity, grab its data, and append it to opportunitiesList
        const opportunity = doc.data();

        // must transform timestamp fields in our DB on our own, explicitly
        opportunity.deadline = opportunity.deadline.toDate().toDateString();
        opportunity.createdAt = opportunity.createdAt.toDate();
        opportunity.updatedAt = opportunity.updatedAt.toDate();

        // Force stringify everything with JSON before returning to prevent any non-POJOs that get through and cause 500s
        opportunitiesList.push(JSON.parse(JSON.stringify(opportunity)));
    }

    return {
        opportunities: opportunitiesList,
        title: "Opportunities"
    }
}