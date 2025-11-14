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
                'people.people_id.picture'
            ]
        })),
        directus.request(readItems('site_config', {
            fields: ['current_leadership_team','mission_statement']
        }))
    ]);

    const currentLeadershipTeamId = siteConfig.current_leadership_team;
    const missionStatement = siteConfig.mission_statement;

    let currentLeadershipTeam = null;
    const otherLeadershipTeams = [];

    for (const team of leadershipTeamsList) {
        if (team.id === currentLeadershipTeamId) {
            currentLeadershipTeam = team;
        } else {
            otherLeadershipTeams.push(team);
        }
    }

    // Sort past leadership teams by year, newest to oldest
    otherLeadershipTeams.sort((a, b) => b.start_year - a.start_year);

    const currentLeadershipTeamYearString = `${currentLeadershipTeam.start_year}-${parseInt(currentLeadershipTeam.start_year) + 1}`;

    return {
        currentLeadershipTeam: currentLeadershipTeam,
        otherLeadershipTeams: otherLeadershipTeams,
        currentLeadershipTeamYearString: currentLeadershipTeamYearString,
        missionStatement: missionStatement,
        // Return the title for this page, which will be handled in the layout svelte file for SEO
        title: "About"
    }
}