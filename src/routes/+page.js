import { directus } from "$lib/directus/client.js";
import { readItems } from "@directus/sdk";

export async function load() {
    const projectsList = directus.request(
        readItems('projects', {
            filter: {
                'status': {
                    "_eq": "published"
                }
            },
            sort: ['sort'],
            limit: 3,
            fields: ['name', 'description', 'image']
        }
        ))

    const sponsorsList = directus.request(
        readItems('sponsors', {
            sort: ['sort'],
            fields: ['name', 'logo']
        }
        ))

    // Pulls the first six image grid items set in the site_config collection in Directus
    const imageGridList = directus.request(
        readItems('site_config', {
            sort: ['image_grid_items.site_config_image_grid_items_sort'],
            // note that we need to use deep to limit the number of related items (from image_grid_items field) returned
            deep: {
                "image_grid_items": {
                    "_limit": 6
                }
            },
            fields: ['image_grid_items.*, image_grid_items.image.*']
        }
        ))

    const siteConfig = directus.request(
        readItems('site_config', {
            fields: ['join_statement', 'calendar_embed_url', 'homepage_organization_tagline', 'homepage_organization_description']
        })
    )

    return {
        // Return the title for this page, which will be handled in the layout svelte file for SEO
        title: "Home",
        projects: await projectsList,
        sponsors: await sponsorsList,
        imageGrid: await imageGridList,
        siteConfig: await siteConfig
    }
}