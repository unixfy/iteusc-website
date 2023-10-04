import {directus} from "$lib/directus/client.js";
import {readItems} from "@directus/sdk";

export async function load() {
    // grab all pages that are published and not hidden from this page
    const list = directus.request(
        readItems('pages', {
                filter: {
                    'status': {
                        "_eq": "published"
                    },
                    'hidden_from_news': {
                        "_eq": false
                    }
                },
                sort: ['date_created'],
            }
        ))

    return {
        items: list,
        title: "News"
    }
}