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

    // generate the year string for the leadership team (e.g. "2024-2025")
    // return a range like current year to next year if it's after July, otherwise return last year to current year
    // example: if today is August 2023, return "2023-2024"; if today is July 2023, return "2022-2023"
    const today = new Date();
    const leadershipTeamYear = (today.getMonth()) > 6 ? today.getFullYear() + 1 : today.getFullYear();
    const leadershipTeamYearString = `${(leadershipTeamYear-1).toString()}-${leadershipTeamYear.toString()}`;

    return {
        teamMembers: await list,
        leadershipTeamYearString: leadershipTeamYearString,
        // Return the title for this page, which will be handled in the layout svelte file for SEO
        title: "About"
    }
}