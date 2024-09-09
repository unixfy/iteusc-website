import { directus } from "$lib/directus/client.js";
import { readItems } from "@directus/sdk";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
    const list = await directus.request(readItems('leadership_teams', {
        filter: { 'status': { "_eq": "published" }, 'id': { "_eq": params.uuid } },
        fields: [
            'id',
            'people',
            'start_year',
            'people.position',
            'people.people_id.first_name',
            'people.people_id.last_name',
            'people.people_id.degrees.degrees_id.name',
            'people.people_id.picture'
        ]
    }))

    if (list.length === 0) {
        error(404, 'Page not found');
    }

    // If the query returns more than one result, we throw 500 error
    if (list.length > 1) {
        error(500, 'Multiple pages with same slug found!!');
    }

    const leadershipTeamYearString = `${list[0].start_year}-${list[0].start_year + 1}`;

    return {
        leadershipTeam: list[0],
        leadershipTeamYearString: leadershipTeamYearString,
        title: `${leadershipTeamYearString} Leadership Team`,
    }
}