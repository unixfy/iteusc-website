import {directus} from "$lib/directus/client.js";
import {readItems} from "@directus/sdk";

export async function load() {
    // grab all pages that are published and not hidden from this page
    const list = await directus.request(
        readItems('pages', {
                filter: {
                    'status': {
                        "_eq": "published"
                    },
                    'hidden_from_news': {
                        "_eq": false
                    }
                },
                sort: ['-date_created', 'title'],
            }
        ))

    // for each page we do some janky parsing to generate an excerpt from the "content" html
    // by grabbing the first 20 words from the first p tag

    let parsed_list = list.map((item) => {
        let content = item.content;
        // This grabs the first ~50 words from the content, strips HTML tags & nbsp, and adds ...
        item.excerpt = content.split(" ").slice(0, 50).join(" ").replace(/<\/?[^>]+(>|$)/g, "").replace("&nbsp;", " ") + '...';
        return item;
    })

    return {
        items: parsed_list,
        title: "News"
    }
}