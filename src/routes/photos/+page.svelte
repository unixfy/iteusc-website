<script>
    export let data;
    import PageHeader from "$lib/PageHeader.svelte";
    import { getStorageDirectUrl } from "$lib/directus/getStorageDirectUrl.js";

    let screenSize;
</script>

<svelte:window bind:innerWidth={screenSize} />

<PageHeader title="Photos" subtitle="See what we do at USC ITE." />

<div class="ct">
    <p class="font-display p-readable mb-8">
        Each year, USC ITE members visit local transportation projects and
        programs, engage in direct conversations with industry experts, and
        participate in friendly competitions with other ITE student chapters.
        These activities not only help students connect academic training with
        practice, but also expand their professional networks while in school.
        Come join us and become part of the transportation family at USC.
    </p>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        {#await data.streamed.items}
            {#each new Array(16) as item}
                <div class="w-full h-64 rounded-lg bg-base-300 animate-pulse" />
            {/each}
        {:then items}
            {#each items as item}
                <a href={item.url} target="_blank" rel="noreferrer">
                    <div
                        class="bg-cover bg-center flex rounded-lg aspect-square p-4 md:hover:scale-105 transition-all"
                        style="background-image: url('{getStorageDirectUrl(
                            item.image.id
                        )}?format=webp&width={Math.ceil(
                            screenSize / 1.5
                        )}&quality=50');"
                    >
                        <div
                            class="m-auto p-4 bg-black bg-opacity-50 rounded-md text-center text-white font-bold text-lg"
                        >
                            <p>{item.name}</p>
                        </div>
                    </div>
                </a>
            {/each}
        {/await}
    </div>
</div>
