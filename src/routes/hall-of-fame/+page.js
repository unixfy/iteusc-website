import { directus } from "$lib/directus/client.js";
import { readItems } from "@directus/sdk";

export async function load() {
    // Pull hall of fame items from Directus
    const hall_of_fame_items_req = directus.request(
        readItems('hall_of_fame', {
            filter: {
                'status': {
                    "_eq": "published"
                }
            },
            // note that we sort by year_inducted first, such that most recently inducted people show up first
            sort: ['-year_inducted', 'last_name', 'first_name'],
            fields: ['*,degrees.degrees_id.name']
        }
        ))

    // Begin processing the items
    let hall_of_fame_items_raw = await hall_of_fame_items_req

    // Init a Map to store the hall of fame items after processing (note that we use Map to preserve order)
    const hall_of_fame_items = new Map([])

    // Loop over each hall of fame item from the Directus response
    hall_of_fame_items_raw.forEach(item => {
        // Grab the induction year for the item
        const year = item.year_inducted;

        // Check if the induction year is already in the Map, if not, add it
        if (!hall_of_fame_items.get(year)) {
            hall_of_fame_items.set(year, [])
        }

        // Add the item to the Map item with the same year as the item in question
        hall_of_fame_items.get(year).push(item);
    });

    return {
        items: hall_of_fame_items,
        title: "Hall of Fame",
        description: "This Hall of Fame honors those who led USC ITE during their college career and have continued to make an impact in their profession, or in other ways brought distinction to their alma mater."
    }
}
