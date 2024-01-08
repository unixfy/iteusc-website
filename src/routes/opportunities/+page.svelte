<script>
    import PageHeader from "$lib/PageHeader.svelte";
    import OpportunitiesCard from "$lib/OpportunitiesCard.svelte";
    import QueryEmptyAlert from "$lib/QueryEmptyAlert.svelte";
    import { parseISO } from "date-fns";
    import { formatInTimeZone } from "date-fns-tz";

    export let data;
</script>

<PageHeader
    title="Transportation Opportunities"
    subtitle="We curate internships and other opportunities in transportation."
/>

<div class="ct pb-8">
    <div class="flex flex-col space-y-4">
        {#each data.opportunities as opportunity}
            <OpportunitiesCard
                name={opportunity.name}
                description={opportunity.description}
                deadline={formatInTimeZone(
                    parseISO(opportunity.deadline),
                    "UTC",
                    "PPP",
                )}
                url={opportunity.url}
            />
        {:else}
            <QueryEmptyAlert />
        {/each}
    </div>
</div>
