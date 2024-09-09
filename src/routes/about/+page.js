import { directus } from "$lib/directus/client.js";
import { readItems } from "@directus/sdk";

export async function load() {
    const leadershipTeamsList = directus.request(
        readItems('leadership_teams', {
            filter: {
                'status': {
                    "_eq": "published"
                }
            },
            fields: [
                'id',
                'people',
                'start_year',
                'people.position',
                'people.people_id.first_name',
                'people.people_id.last_name',
                'people.people_id.degrees.degrees_id.name',
                'people.people_id.picture.id'
            ]
        }
        ));

    // fetches the UUID for the current leadership team from Directus API
    const currentLeadershipTeamId = (await directus.request(readItems('site_config', {
        fields: ['current_leadership_team']
    }))).current_leadership_team;

    // filters leadershipTeamsList to only include the current leadership team
    const currentLeadershipTeam = (await leadershipTeamsList).find(team => team.id === currentLeadershipTeamId);

    // generate the year string for the current leadership team (e.g. "2024-2025")
    const currentLeadershipTeamYearString = `${currentLeadershipTeam.start_year}-${currentLeadershipTeam.start_year + 1}`;

    // creates list of all other leadership teams besides the current one
    const otherLeadershipTeams = (await leadershipTeamsList).filter(team => team.id !== currentLeadershipTeamId);

    return {
        currentLeadershipTeam: currentLeadershipTeam,
        otherLeadershipTeams: otherLeadershipTeams,
        currentLeadershipTeamYearString: currentLeadershipTeamYearString,
        // Return the title for this page, which will be handled in the layout svelte file for SEO
        title: "About"
    }
}