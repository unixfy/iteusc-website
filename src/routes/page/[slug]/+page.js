import { error } from "@sveltejs/kit";
import { directus } from "$lib/directus/client.js";
import { readItems } from "@directus/sdk";
import { getStorageDirectUrl } from "$lib/directus/getStorageDirectUrl.js";
import { decodeHTML } from "entities";

export async function load({ params }) {
    // Check if page with slug exists in Directus
    const list = await directus.request(
        readItems('pages', {
            filter: { 'slug': { "_eq": params.slug } },
            fields: [
                'title', 'date_posted', 'slug', 'image', 'content_blocks', 'content',
                'people.people_id.first_name', 'people.people_id.last_name', 'people.people_id.bio'
            ]
        })
    );

    // Handle errors based on the length of the list
    if (list.length === 0) {
        error(404, 'Page not found');
    } else if (list.length > 1) {
        error(500, 'Multiple pages with same slug found!!');
    }

    const page = list[0];

    // Generate excerpt from content if available
    if (page.content) {
        const content = page.content;
        page.excerpt = decodeHTML(content.split(" ").slice(0, 50).join(" ").replace(/<\/?[^>]+(>|$)/g, "")) + '...';
    }

    // Process content blocks if available
    if (page.content_blocks) {
        const contentBlocks = page.content_blocks.content;
        page.content_blocks.content = contentBlocks.map(content => {
            if (content.type === "relation-block" && content.attrs?.id) {
                const relatedNode = page.blocks.find(node => node.id === content.attrs.id);
                if (relatedNode) {
                    content.attrs.data = relatedNode.item;
                }
            }
            return content;
        });

        // Generate excerpt from the first paragraph if available
        const firstParagraph = contentBlocks.find(content => content.type === "paragraph");
        if (firstParagraph && firstParagraph.content[0]?.text) {
            page.excerpt = firstParagraph.content[0].text.split(" ").slice(0, 50).join(" ") + '...';
        }
    }

    // Return the result
    return {
        page,
        title: page.title,
        description: page.excerpt,
        socialImage: page.image ? getStorageDirectUrl(page.image) + '?format=webp&quality=50&width=800' : null
    };
}
