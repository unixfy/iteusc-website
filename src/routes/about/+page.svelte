<script>
    import PageHeader from "$lib/PageHeader.svelte";
    import TeamMemberCard from "$lib/TeamMemberCard.svelte";
    import { getStorageDirectUrl } from "$lib/directus/getStorageDirectUrl.js";

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
        <p>
            {data.missionStatement}
        </p>
    </div>
    <!--   Current team section -->
    <div class="section">
        <h1 class="section-heading text-center">
            Meet our {data.currentLeadershipTeamYearString} leadership team
        </h1>

        <div class="grid md:grid-cols-3 lg:grid-cols-4">
            <!--            Display a card for each team member -->
            {#each data.currentLeadershipTeam.people as teamMember}
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
            {/each}
        </div>
    </div>

    <!-- Past leadership teams section  -->
    <div class="section">
        <div class="narrow-ct">
            <h1 class="section-heading text-center">Past leadership teams</h1>

            <div class="join join-vertical w-full">
                {#each data.otherLeadershipTeams as team}
                    <a
                        class="btn btn-block btn-lg join-item"
                        href="/about/leadership-team/{team.id}"
                        >{team.start_year} Leadership Team</a
                    >
                {/each}
            </div>
        </div>
    </div>
</div>
