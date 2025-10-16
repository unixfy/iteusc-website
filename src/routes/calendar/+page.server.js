import { directus } from "$lib/directus/client.js";
import { readItems } from "@directus/sdk";

export async function load() {
    const siteConfig = await directus.request(readItems('site_config', {
        fields: ['calendar_embed_url']
    }))

    return {
        // Return the title for this page, which will be handled in the layout svelte file for SEO
        title: "Calendar",
        calendarEmbedUrl: siteConfig.calendar_embed_url
    }
}