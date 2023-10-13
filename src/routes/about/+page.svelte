<script>
    import PageHeader from "$lib/PageHeader.svelte";
    import TeamMemberCard from "$lib/TeamMemberCard.svelte";
    import {getStorageDirectUrl} from "$lib/directus/getStorageDirectUrl.js";

    export let data;
</script>

<PageHeader title="About USC ITE" subtitle="Learn more about who we are and what we do."></PageHeader>
<div class="ct">

    <!--    Mission statement box -->
    <div class="bg-ite-blue p-4 md:p-8 flex flex-col text-center text-white">
        <h1 class="text-2xl md:text-3xl mt-auto pb-4">
            Our mission statement
        </h1>
        <p>
            The mission of the USC Institute of Transportation Engineers chapter is to promote the development of
            innovative and sustainable transportation solutions that meet the needs of the community. We aim to foster
            discussion and collaboration among students, faculty, and professionals in the transportation industry to
            advance the field of transportation engineering and planning. Our chapter is committed to exploring and
            addressing the most pressing transportation issues of our time, including smart systems, micromobility, and
            equity in transportation access. We strive to create a welcoming and inclusive environment that encourages
            diversity of thought and promotes the exchange of ideas.
        </p>
    </div>
    <!--    Team section -->
    <div class="section">
        <h1 class="section-heading text-center">Meet our 2023-2024 Leadership team</h1>

        <div class="grid md:grid-cols-3 lg:grid-cols-4">
            <!--            Display a card for each team member -->
            {#each data.teamMembers as member}
                <TeamMemberCard name="{member.name}" role="{member.role}" image="{getStorageDirectUrl(member.image)}?width=400"
                                major="{member.major.map((degree) => degree.degrees_id.name).join(', ')}"/>
            {/each}
        </div>
    </div>
</div>

