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
            Our mission is to empower USC students to develop innovative and
            sustainable transportation solutions for our future. We help our
            students explore the opportunities available in the transportation
            industry, through collaboration with agencies and firms, field trips
            to facilities and construction sites, professional conferences,
            social events, and community engagement. Most importantly, we value
            diversity, and we're proud to build an inclusive and exciting
            community of Trojans passionate about transportation.
        </p>
    </div>
    <!--    Team section -->
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
                        teamMember.people_id.picture.id,
                    )}?width=400&format=webp"
                    major={teamMember.people_id.degrees
                        .map((degree) => degree.degrees_id.name)
                        .join(", ")}
                />
            {/each}
        </div>
    </div>
</div>
