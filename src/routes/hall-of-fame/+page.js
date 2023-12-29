import { directus } from "$lib/directus/client.js";
import { readItems } from "@directus/sdk";
import { groupDataByProperty } from "$lib/directus/groupDataByProperty";

export async function load() {
    // Pull hall of fame items from Directus, then group them by their year_inducted attribute
    const hall_of_fame_items = directus.request(
        readItems('hall_of_fame', {
            filter: {
                'status': {
                    "_eq": "published"
                }
            },
            sort: ["-year_inducted", "last_name", "first_name"],
            fields: ["*,degrees.degrees_id.name"]
        }
        )).then((items) => {
            // group the hall of fame items by year_inducted using the groupDataByProperty function
            const hall_of_fame_items = groupDataByProperty(items, 'year_inducted')
            return hall_of_fame_items
        })

    return {
        items: hall_of_fame_items,
        title: "Hall of Fame",
        description: "This Hall of Fame honors those who led USC ITE during their college career and have continued to make an impact in their profession, or in other ways brought distinction to their alma mater."
    }
}
