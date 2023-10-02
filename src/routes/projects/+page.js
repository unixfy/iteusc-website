import {directus} from "$lib/directus/client.js";
import {readItems} from "@directus/sdk";

export async function load() {
    const list = directus.request(
        readItems('projects', {
            filter: {
                'status': {
                    "_eq": "published"
                }
            },
            sort: ['sort'],
        }
    ))

    return {
        projects: list,
        // Return the title for this page, which will be handled in the layout svelte file for SEO
        title: "Projects"
    }
}