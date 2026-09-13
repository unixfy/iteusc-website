<script>
    import PageHeader from "$lib/PageHeader.svelte";
    import TeamMemberCard from "$lib/TeamMemberCard.svelte";
    import { getStorageDirectUrl } from "$lib/directus/getStorageDirectUrl.js";
    import { setAttr } from "$lib/directus/visualEditor.js";

    export let data;
</script>

<PageHeader
    title="About USC ITE"
    subtitle="Learn more about who we are and what we do."
></PageHeader>
<div class="ct">
    <!--    Mission statement box -->
    <div class="bg-ite-blue p-4 md:p-8 flex flex-col text-center text-white">
        <h1 class="text-2xl md:text-3xl mt-auto pb-4">Our mission statement</h1>
        <p             data-directus={setAttr({
                collection: "site_config",
                item: "797fe000-9c1f-4ed1-afaf-1c6610ed1941",
                fields: "mission_statement",
                mode: "popover",
            })}>
            {data.missionStatement}
        </p>
    </div>
    <!--   Current team section -->
    <div class="section"             data-directus={setAttr({
                collection: "site_config",
                item: "797fe000-9c1f-4ed1-afaf-1c6610ed1941",
                fields: "current_leadership_team",
                mode: "popover",
            })}>
        <h1 class="section-heading text-center">
            Meet our {data.currentLeadershipTeamYearString} leadership team
        </h1>

        <div class="grid md:grid-cols-3 lg:grid-cols-4">
            <!--            Display a card for each team member -->
            {#each data.currentLeadershipTeam.people as teamMember}
            <div             data-directus={setAttr({
                collection: "people",
                item: teamMember.people_id.id,
                fields: "",
                mode: "modal",
            })}>

                <TeamMemberCard
                    name="{teamMember.people_id.first_name} {teamMember
                        .people_id.last_name}"
                    role={teamMember.position}
                    image="{getStorageDirectUrl(
                        teamMember.people_id.picture,
                    )}?width=400&format=webp"
                    major={teamMember.people_id.degrees
                        .map((degree) => degree.degrees_id.name)
                        .join(", ")}
                />
            </div>
            {/each}
        </div>
    </div>

    <!-- Past leadership teams section  -->
    <div class="section">
        <div class="narrow-ct">
            <h1 class="section-heading text-center">Past leadership teams</h1>

            <div class="flex flex-col gap-2 w-full">
                {#each data.otherLeadershipTeams as team}
                    <a
                        class="btn btn-block btn-lg"
                        href="/about/leadership-team/{team.id}"
                        >{team.start_year} Leadership Team</a
                    >
                {/each}
            </div>
        </div>
    </div>
</div>
