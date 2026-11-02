<script>
    import PageHeader from "$lib/PageHeader.svelte";
    import OpportunitiesCard from "$lib/OpportunitiesCard.svelte";
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
                deadline={opportunity.deadline
                    ? formatInTimeZone(
                          parseISO(opportunity.deadline),
                          "UTC",
                          "PPP",
                      )
                    : null}
                url={opportunity.url}
            />
        {:else}
            <div class="alert">
                <span>
                    We don't have any opportunities listed right now. Check back
                    soon, or <a class="link" href="/join/">join USC ITE</a> to get
                    involved in the meantime.
                </span>
            </div>
        {/each}
    </div>
</div>
