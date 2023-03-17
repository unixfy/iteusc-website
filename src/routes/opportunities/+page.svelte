<script>
    import PageHeader from "$lib/PageHeader.svelte";

    export let data;
</script>

<PageHeader title="Transportation Opportunities"
            subtitle="We curate internships and other opportunities in transportation."></PageHeader>

<div class="ct pb-8">
    <div class="flex flex-col space-y-4">
        {#each data.opportunities as opportunity}
            <div class="card card-side bg-base-100 border">
                <div class="card-body">
                    <h2 class="card-title">{opportunity.title}</h2>
                    <div>
                        <p>{opportunity.shortdesc}</p>
                    </div>
                    <p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             class="bi bi-clock inline" viewBox="0 0 16 16">
                            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                        </svg>
                        Apply by {opportunity.enddate}</p>

                    <div class="card-actions justify-start">
                        <a class="btn btn-primary btn-sm" href="{opportunity.link}" target="_blank" rel="noreferrer">Apply
                            Now</a>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>
