<script>
    import PageHeader from "$lib/PageHeader.svelte";
    import QueryEmptyAlert from "$lib/QueryEmptyAlert.svelte";
    import { getStorageDirectUrl } from "$lib/directus/getStorageDirectUrl.js";
    import { setAttr } from "$lib/directus/visualEditor.js";

    export let data;

    let dialogs = [];

    const truncate = (text, length = 250) =>
        text.length > length ? `${text.substring(0, length).trimEnd()}...` : text;
</script>

<PageHeader
    title="Our Projects"
    subtitle="How we're impacting the world of transportation."
/>
<div class="ct">
    <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
        {#each data.projects as project, i}
            <button
                type="button"
                class="card card-compact h-full cursor-pointer bg-base-200 border border-base-200 text-left hover:shadow-xl hover:scale-105 transition-all"
                aria-haspopup="dialog"
                data-directus={setAttr({
                    collection: "projects",
                    item: project.id,
                    fields: "",
                    mode: "drawer",
                })}
                on:click={() => dialogs[i].showModal()}
            >
                <figure class="aspect-video w-full">
                    <img
                        class="h-full w-full object-cover"
                        src="{getStorageDirectUrl(
                            project.image,
                        )}?quality=50&width=400&format=webp"
                        alt=""
                    />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">{project.name}</h2>
                    <p>
                        <!--                            this description in the card is truncated to 250 characters -->
                        {truncate(project.description)}
                    </p>
                </div>
            </button>

            <dialog class="modal" bind:this={dialogs[i]} aria-labelledby="project-title-{i}">
                <div class="modal-box">
                    <h2 id="project-title-{i}" class="text-lg font-bold">{project.name}</h2>
                    <p class="py-4">
                        {project.description}
                    </p>
                    <form method="dialog" class="modal-action">
                        <button class="btn">Close</button>
                    </form>
                </div>
                <!-- Clicking outside closes too; the Close button above is the keyboard path, so skip this in tab order -->
                <form method="dialog" class="modal-backdrop">
                    <button tabindex="-1" aria-hidden="true">Close</button>
                </form>
            </dialog>
        {:else}
            <QueryEmptyAlert />
        {/each}
    </div>
</div>
