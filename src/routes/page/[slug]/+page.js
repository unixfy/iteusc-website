import { error } from "@sveltejs/kit";
import { directus } from "$lib/directus/client.js";
import { readItems } from "@directus/sdk";
import { getStorageDirectUrl } from "$lib/directus/getStorageDirectUrl.js";
import { decodeHTML } from "entities";

export async function load({ params }) {
    // check if page with slug exists in Directus
    const list = await directus.request(
        readItems('pages', {
            filter: {
                'slug': {
                    "_eq": params.slug
                }
            },
            // pull all related authors' details and blocks
            fields: ['*', 'authors.authors_id.*', 'blocks.*.*.*']
        })
    )

    // If the query returns nothing, we throw 404 error
    if (list.length === 0) {
        error(404, 'Page not found');
    }

    // If the query returns more than one result, we throw 500 error
    if (list.length > 1) {
        error(500, 'Multiple pages with same slug found!!');
    }

    if (list[0].content) {
        let content = list[0].content;
        // This grabs the first ~50 words from the content, strips HTML tags & nbsp, and adds ...
        list[0].excerpt = decodeHTML(content.split(" ").slice(0, 50).join(" ").replace(/<\/?[^>]+(>|$)/g, "")) + '...';
    }

    if (list[0].content_blocks) {
        // Inject data into content_blocks (from blocks)
        list[0].content_blocks.content = list[0].content_blocks.content.map(content => {
            // only runs on relation-block items
            if (content.type == "relation-block" && content.attrs?.id) {
                // finds the block with an ID matching the relation listed in content_blocks
                // then injects its related "item" into the content_blocks object
                const relatedNode = list[0].blocks.find(
                    (node) => node.id === content.attrs.id
                )

                content.attrs.data = relatedNode.item
            }
            return content;
        });

        // for the excerpt, get the first 50 words from the text of the first paragraph
        list[0].excerpt = list[0].content_blocks.content.find(content => content.type === "paragraph").content[0].text.split(" ").slice(0, 50).join(" ") + '...';
    }



    // If the query returns exactly one result, we return it
    return {
        page: list[0],
        title: list[0].title,
        description: list[0].excerpt,
        socialImage: list[0].image ? getStorageDirectUrl(list[0].image) + '?format=webp&quality=50&width=800' : null
    }
}
