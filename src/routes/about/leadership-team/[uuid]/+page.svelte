<script>
    import PageHeader from "$lib/PageHeader.svelte";
    import TeamMemberCard from "$lib/TeamMemberCard.svelte";
    import { getStorageDirectUrl } from "$lib/directus/getStorageDirectUrl.js";

    export let data;
</script>

<div class="bg-usc-cardinal text-white py-6">
    <div class="ct pb-8">
        <div class="breadcrumbs mb-4 overflow-hidden font-display">
            <ul>
                <li><a href="/">USC ITE</a></li>
                <li><a href="/about">About</a></li>
                <li>{data.title}</li>
            </ul>
        </div>

        <div>
            <h1 class="section-heading">{data.title}</h1>
            <p class="section-subheading">Meet our past leadership team.</p>
        </div>
    </div>
</div>

<div class="ct section">
    <div class="grid md:grid-cols-3 lg:grid-cols-4">
        {#each data.leadershipTeam.people as teamMember}
            <TeamMemberCard
                name="{teamMember.people_id.first_name} {teamMember.people_id
                    .last_name}"
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
