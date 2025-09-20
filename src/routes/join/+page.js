import { directus } from "$lib/directus/client.js";
import { readItems } from "@directus/sdk";

export async function load() {
    const siteConfig = await directus.request(readItems('site_config', {
        fields: ['join_form_url', 'join_statement']
    }))

    return {
        // Return the title for this page, which will be handled in the layout svelte file for SEO
        title: "Join Us",
        siteConfig
    }
}