import { directus } from "$lib/directus/client.js";
import { readItems } from "@directus/sdk";

export async function load() {
    const config = await directus.request(readItems('site_config', {
        fields: ['join_form_url']
    }))

    return {
        // Return the title for this page, which will be handled in the layout svelte file for SEO
        title: "Join Us",
        config
    }
}