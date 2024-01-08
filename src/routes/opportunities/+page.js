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
        opportunities: await list,
        title: "Opportunities"
    }
}