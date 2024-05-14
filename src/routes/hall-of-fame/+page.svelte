<script>
    import PageHeader from "$lib/PageHeader.svelte";
    import QueryEmptyAlert from "$lib/QueryEmptyAlert.svelte";
    import HallofFameCard from "$lib/HallofFameCard.svelte";
    import { getStorageDirectUrl } from "$lib/directus/getStorageDirectUrl.js";

    export let data;
</script>

<PageHeader title="Hall of Fame" subtitle="Meet our past USC ITE leaders." />

<div class="ct pb-8">
    <p class="font-display p-readable mb-8">
        This Hall of Fame honors those who led USC ITE during their college
        career and have continued to make an impact in their profession, or in
        other ways brought distinction to their alma mater.
    </p>

    <!-- iterate over the map generated in +page.js; decompose into the induction year (a string) and its respective items (an array of people objects)  -->
    <div class="flex flex-col gap-16">
        {#each data.items as [induction_year, items]}
            <div>
                <h2 class="section-heading text-center sm:text-left pb-6">
                    {induction_year} Inductees
                </h2>
                <div class="flex flex-col gap-12">
                    {#each items as item}
                        <HallofFameCard
                            name="{item.first_name} {item.last_name}"
                            bio={item.bio}
                            degrees={item.degrees
                                .map((degree) => degree.degrees_id.name)
                                .join(", ")}
                            linkedin={item.linkedin}
                            image="{getStorageDirectUrl(
                                item.image,
                            )}?format=webp"
                            participation_start={item.participation_start}
                            participation_end={item.participation_end}
                            role={item.role}
                        />
                    {/each}
                </div>
            </div>
        {:else}
            <QueryEmptyAlert />
        {/each}
    </div>
</div>
