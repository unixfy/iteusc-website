import {firestore} from "$lib/firebase/client";
import {collection, where, query} from "firebase/firestore";
import getFirestoreData from "$lib/firebase/getFirestoreData.js";
import {directus} from "$lib/directus/client.js";
import {readItems} from "@directus/sdk";

export async function load() {
    const list = directus.request(
        readItems('opportunities', {
                filter: {
                    'status': {
                        "_eq": "published"
                    }
                },
                sort: ['deadline']
            }
        ))

    return {
        opportunities: list,
        title: "Opportunities"
    }
}