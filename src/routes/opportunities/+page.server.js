import {ref, get, query, orderByKey} from "firebase/database";

export async function load({locals}) {
    const db = locals.database;
    const snapshot = ref(db, 'internships');

    // this array will be filled up with all our opportunities by our Firebase query
    let opportunitiesList = [];

    // firebase realtime DB is really stupid, so we need to iterate over every. single. child. and get details from there :/
    // why no shallow queries???
    const data = await get(query(snapshot, orderByKey())).then((snapshot) =>
        // iterate over each child in the snapshot and grab its data
        snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            opportunitiesList.push(childData);
        })
    );

    return {
        opportunities: opportunitiesList
    }
}