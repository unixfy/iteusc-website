import { directus } from "$lib/directus/client.js"
import { readItems } from "@directus/sdk"

export async function load() {
    const list = directus.request(
        readItems('photo_archive_items', {
            filter: {
                'status': {
                    "_eq": "published"
                }
            },
            sort: ["-date"],
            fields: ['*,image.*']
        }
    ))

    return {
        streamed: {
            items: list
        },
        title: "Photos"
    }
}