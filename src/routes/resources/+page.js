import { directus } from "$lib/directus/client.js";
import { readItems } from "@directus/sdk";

export async function load() {
    const list = directus.request(
        readItems('resources_tags', {
            fields: ['name', 'related_resources.resources_id.name', 'related_resources.resources_id.url', 'related_resources.resources_id.description'],
            sort: ['sort']
        }
        ))

    return {
        resources_tags: await list,
        title: "Resources"
    }
}