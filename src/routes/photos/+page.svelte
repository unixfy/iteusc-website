<script>
    export let data;
    import PageHeader from "$lib/PageHeader.svelte";
    import { getStorageDirectUrl } from "$lib/directus/getStorageDirectUrl.js";
    import { format, parseISO } from "date-fns";

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

    {#await data.streamed.items}
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            {#each new Array(16) as item}
                <div class="w-full h-64 rounded-lg bg-base-300 animate-pulse" />
            {/each}
        </div>
    {:then items}
        {#each items as [year, items]}
            <div class="my-8">
                <h2 class="section-heading">{year}</h2>
                <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {#each items as item}
                        <a href={item.url} target="_blank" rel="noreferrer">
                            <div
                                class="h-full bg-cover bg-center flex rounded-lg sm:aspect-square py-8 sm:py-4 px-4 md:hover:scale-105 transition-all"
                                style="background-image: url('{getStorageDirectUrl(
                                    item.image.id,
                                )}?format=webp&width={Math.ceil(
                                    screenSize / 1.5,
                                )}&quality=50');"
                            >
                                <div
                                    class="m-auto p-4 bg-black bg-opacity-50 rounded-md text-center text-white"
                                >
                                    <p class="font-bold text-lg">{item.name}</p>
                                    <p class="text-sm">
                                        {format(
                                            parseISO(item.date),
                                            "LLLL d, y",
                                        )}
                                    </p>
                                </div>
                            </div>
                        </a>
                    {/each}
                </div>
            </div>
        {/each}
    {/await}
</div>
