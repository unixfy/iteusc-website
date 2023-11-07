import {error} from "@sveltejs/kit";
import {directus} from "$lib/directus/client.js";
import {readItems} from "@directus/sdk";
import {getStorageDirectUrl} from "$lib/directus/getStorageDirectUrl.js";
import {decodeHTML} from "entities";

export async function load({params}) {
    // check if page with slug exists in Directus
    const list = await directus.request(
        readItems('pages', {
            filter: {
                'slug': {
                    "_eq": params.slug
                }
            },
            fields: ['*','author.name','author.bio']
        })
    )

    // If the query returns nothing, we throw 404 error
    if (list.length === 0) {
        throw error(404, 'Page not found')
    }

    let content = list[0].content;
    // This grabs the first ~50 words from the content, strips HTML tags & nbsp, and adds ...
    list[0].excerpt = decodeHTML(content.split(" ").slice(0, 50).join(" ").replace(/<\/?[^>]+(>|$)/g, "")) + '...';

    // If the query returns more than one result, we throw 500 error
    if (list.length > 1) {
        throw error(500, 'Multiple pages with same slug found!!')
    }

    // If the query returns exactly one result, we return it
    return {
        page: list[0],
        title: list[0].title,
        description: list[0].excerpt,
        socialImage: list[0].image ? getStorageDirectUrl(list[0].image) + '?format=webp&quality=50&width=800' : null
    }
}
