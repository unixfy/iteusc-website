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
                <div>
                    <label
                        for="modal{item.image.id}"
                        class="hover:cursor-pointer"
                        aria-label="Click to open large version of {item.image
                            .title}"
                    >
                        <img
                            class="h-auto max-w-full rounded-lg aspect-square object-cover"
                            src="{getStorageDirectUrl(
                                item.image.id
                            )}?format=webp&width={Math.ceil(
                                screenSize / 2
                            )}&quality=50"
                            alt={item.name}
                        />
                    </label>

                    <input
                        type="checkbox"
                        id="modal{item.image.id}"
                        class="modal-toggle"
                    />
                    <div class="modal">
                        <div class="modal-box">
                            <label
                                for="modal{item.image.id}"
                                class="btn btn-sm btn-circle absolute right-2 top-2"
                                >✕</label
                            >
                            <img
                                class="w-full h-full py-6"
                                src={getStorageDirectUrl(item.image.id)}
                                alt={item.name}
                            />
                            <p class="p-readable">{item.name}</p>
                        </div>
                        <label class="modal-backdrop" for="modal{item.image.id}"
                            >Close</label
                        >
                    </div>
                </div>
            {/each}
        {/await}
    </div>
</div>
