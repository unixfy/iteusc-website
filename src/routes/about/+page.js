import {directus} from "$lib/directus/client.js";
import {readItems} from "@directus/sdk";

export async function load() {
    const list = directus.request(
        readItems('team_members', {
            filter: {
                'status': {
                    "_eq": "published"
                }
            },
            sort: ['sort'],
            fields: ['*,major.degrees_id.name']
        }
    ));


    return {
        teamMembers: list,
        // Return the title for this page, which will be handled in the layout svelte file for SEO
        title: "About"
    }
}