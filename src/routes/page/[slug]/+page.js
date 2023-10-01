import {error} from "@sveltejs/kit";
import {directus} from "$lib/directus/client.js";
import {readItems} from "@directus/sdk";

export async function load({params}) {
    // check if page with slug exists in Directus
    const list = await directus.request(
        readItems('pages', {
            filter: {
                'slug': {
                    "_eq": params.slug
                }
            }
        })
    )

    // If the query returns nothing, we throw 404 error
    if (list.length === 0) {
        throw error(404, 'Page not found')
    }

    // If the query returns more than one result, we throw 500 error
    if (list.length > 1) {
        throw error(500, 'Multiple pages with same slug found!!')
    }

    // If the query returns exactly one result, we return it
    return {
        page: list[0],
        title: list[0].title
    }
}
