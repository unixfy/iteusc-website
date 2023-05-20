<script>
    import PageHeader from "$lib/PageHeader.svelte";
    import {getStorageDirectUrl} from "$lib/firebase/getStorageDirectUrl.js";

    export let data;
</script>

<PageHeader title="Our Projects" subtitle="How we're impacting the world of transportation."></PageHeader>
<div class="ct">
    <div class="grid md:grid-cols-2 lg:grid-cols-3 mb-8">
        {#each data.projects as project}
            <label for="project-modal">
                <div class="card card-compact bg-base-200 border border-base-200 hover:shadow-xl my-4 mx-8 hover:scale-[1.05] transition-all hover:bg-base-300 hover:cursor-pointer">
                    <figure><img src="{getStorageDirectUrl(project.image)}" alt="{project.name}"/></figure>
                    <div class="card-body">
                        <h2 class="card-title">{project.name}</h2>
                        <p>
                            <!--                            this description in the card is truncated to 250 characters -->
                            {project.description.substring(0, 250)}...
                        </p>
                    </div>
                </div>
            </label>

            <input type="checkbox" id="project-modal" class="modal-toggle"/>
            <label for="project-modal" class="modal cursor-pointer">
                <div class="modal-box relative">
                    <label for="project-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 class="text-lg font-bold">{project.name}</h3>
                    <p class="py-4">
                        {project.description}
                    </p>
                </div>
            </label>
        {/each}
    </div>
</div>