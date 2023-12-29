import { directus } from "$lib/directus/client.js"
import { readItems } from "@directus/sdk"
import { groupDataByProperty } from "$lib/directus/groupDataByProperty"

export async function load() {
    // request photo archive items from directus, then parse the year from each date and group by year (all in one promise)
    const photos_list = directus.request(
        readItems('photo_archive_items', {
            filter: {
                'status': {
                    "_eq": "published"
                }
            },
            sort: ["-date"],
            fields: ['*,image.*']
        }
        )).then((photos) => {
            // use date-fns to parse the year from each date, then add a "year" field to each photo item
            photos = photos.map((photo) => {
                const date = new Date(photo.date)
                photo.year = date.getFullYear()
                return photo
            })
            // group the photos by year using the groupDataByProperty function
            const photos_grouped = groupDataByProperty(photos, 'year')
            return photos_grouped
        })

    return {
        streamed: {
            items: photos_list
        },
        title: "Photos"
    }
}