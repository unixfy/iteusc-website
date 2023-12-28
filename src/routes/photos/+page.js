import { directus } from "$lib/directus/client.js"
import { readItems } from "@directus/sdk"

export async function load() {
    const photos_req = directus.request(
        readItems('photo_archive_items', {
            filter: {
                'status': {
                    "_eq": "published"
                }
            },
            sort: ["-date"],
            fields: ['*,image.*']
        }
        ))

    let photos_raw = await photos_req

    // use date-fns to parse the year from each date, then add a "year" field to each photo item
    photos_raw = photos_raw.map((photo) => {
        const date = new Date(photo.date)
        photo.year = date.getFullYear()
        return photo
    })

    let photos_list = new Map([])

    // group photos by year
    photos_raw.forEach(photo => {
        const year = photo.year
        if (!photos_list.get(year)) {
            photos_list.set(year, [])
        }
        photos_list.get(year).push(photo)
    })

    return {
        streamed: {
            items: photos_list
        },
        title: "Photos"
    }
}