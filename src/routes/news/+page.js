import { directus } from "$lib/directus/client.js";
import { readItems } from "@directus/sdk";
import { decodeHTML } from "entities";

export async function load() {
    // grab all pages that are published and not hidden from this page
    // then for each page we do some janky parsing to generate an excerpt from the "content" html
    // by grabbing the first 50 words from the first p tag
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
            sort: ['-date_posted', 'title'],
            fields: ['title', 'date_posted', 'slug', 'image', 'content_blocks', 'content', 'people.people_id.first_name', 'people.people_id.last_name']
        }
        )).then((items) => {
            items.map((item) => {
                if (item.content) {
                    let content = item.content;
                    // This grabs the first ~50 words from the content, strips HTML tags & nbsp, and adds ...
                    item.excerpt = decodeHTML(content.split(" ").slice(0, 50).join(" ").replace(/<\/?[^>]+(>|$)/g, "")) + '...';
                    return item;
                }

                if (item.content_blocks) {
                    // for the excerpt, get the first 50 words from the text of the first paragraph
                    item.excerpt = item.content_blocks.content.find(content => content.type === "paragraph").content[0].text.split(" ").slice(0, 50).join(" ") + '...';
                }
            })
            return items
        })

    return {
        items: await list,
        title: "News",
        socialImage: "/images/portland-train.jpg"
    }
}