<script>
    import PageHeader from "$lib/PageHeader.svelte";
    import QueryEmptyAlert from "$lib/QueryEmptyAlert.svelte";
    import HallofFameCard from "$lib/HallofFameCard.svelte";
    import { getStorageDirectUrl } from "$lib/directus/getStorageDirectUrl.js";

    export let data;
</script>

<PageHeader title="Hall of Fame" subtitle="Meet our past USC ITE members." />

<div class="ct pb-8">
    <div class="flex flex-col gap-12">
        {#each data.items as item}
            <HallofFameCard
                name={item.name}
                bio={item.bio}
                degrees={item.degrees.map((degree) => degree.degrees_id.name).join(", ")}
                linkedin={item.linkedin}
                image={getStorageDirectUrl(item.image)}
                participation_start="{item.participation_start}"
                participation_end="{item.participation_end}"
                role="{item.role}"
            />
        {:else}
            <QueryEmptyAlert />
        {/each}
    </div>
</div>
