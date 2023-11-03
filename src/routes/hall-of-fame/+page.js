import { directus } from "$lib/directus/client.js";
import { readItems } from "@directus/sdk";

export async function load() {
    const list = directus.request(
        readItems('hall_of_fame', {
            filter: {
                'status': {
                    "_eq": "published"
                }
            },
            sort: ['sort'],
            fields: ['*,degrees.degrees_id.name']
        }
        ))

    return {
        items: list,
        title: "Hall of Fame",
        description: "This Hall of Fame honors those who led USC ITE during their college career and have continued to make an impact in their profession, or in other ways brought distinction to their alma mater."
    }
}