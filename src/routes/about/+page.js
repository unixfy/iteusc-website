import { directus } from "$lib/directus/client.js";
import { readItems } from "@directus/sdk";

export async function load() {
    const [leadershipTeamsList, siteConfig] = await Promise.all([
        directus.request(readItems('leadership_teams', {
            filter: { 'status': { "_eq": "published" } },
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
        })),
        directus.request(readItems('site_config', {
            fields: ['current_leadership_team']
        }))
    ]);

    const currentLeadershipTeamId = siteConfig.current_leadership_team;

    let currentLeadershipTeam = null;
    const otherLeadershipTeams = [];

    for (const team of leadershipTeamsList) {
        if (team.id === currentLeadershipTeamId) {
            currentLeadershipTeam = team;
        } else {
            otherLeadershipTeams.push(team);
        }
    }

    const currentLeadershipTeamYearString = `${currentLeadershipTeam.start_year}-${parseInt(currentLeadershipTeam.start_year) + 1}`;

    return {
        currentLeadershipTeam: currentLeadershipTeam,
        otherLeadershipTeams: otherLeadershipTeams,
        currentLeadershipTeamYearString: currentLeadershipTeamYearString,
        // Return the title for this page, which will be handled in the layout svelte file for SEO
        title: "About"
    }
}