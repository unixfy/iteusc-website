import {directus} from "$lib/directus/client.js";
import {readItems} from "@directus/sdk";

export async function load() {
    const projectsList = directus.request(
        readItems('projects', {
            filter: {
                'status': {
                    "_eq": "published"
                }
            },
            sort: ['sort'],
            limit: 3
        }
    ))

    const imageGridList = directus.request(
        readItems('image_grid_items', {
            filter: {
                'status': {
                    "_eq": "published"
                }
            },
            sort: ['sort'],
            limit: 6
        }
    ))

    return {
        // Return the title for this page, which will be handled in the layout svelte file for SEO
        title: "Home",
        projects: projectsList,
        imageGrid: imageGridList
    }
}