<script>
    import PageHeader from "$lib/PageHeader.svelte";
    import QueryEmptyAlert from "$lib/QueryEmptyAlert.svelte";
    import HallofFameCard from "$lib/HallofFameCard.svelte";
    import { getStorageDirectUrl } from "$lib/firebase/getStorageDirectUrl.js";

    export let data;
</script>

<PageHeader title="Hall of Fame" subtitle="Meet our past USC ITE members." />

<div class="ct pb-8">
    <div class="flex flex-col gap-12">
        {#each data.items as item}
            <HallofFameCard
                name={item.name}
                bio={item.bio}
                image={getStorageDirectUrl(item.image)}
            />
        {:else}
            <QueryEmptyAlert />
        {/each}
    </div>
</div>
