<script>
    import PageHeader from "$lib/PageHeader.svelte";
    import OpportunitiesCard from "$lib/OpportunitiesCard.svelte";

    export let data;
</script>

<PageHeader title="Transportation Opportunities"
            subtitle="We curate internships and other opportunities in transportation."></PageHeader>

<div class="ct pb-8">
    <div class="flex flex-col space-y-4">
        {#each data.opportunities as opportunity}
            <OpportunitiesCard {opportunity} />
        {/each}
    </div>
</div>
