<script>
    // uuid of image
    export let id;
    // file name of image in static/images
    export let image;
    // text description overlaid on image
    export let text;
    // larger description expanded when image is clicked (optional)
    export let description;
</script>

<!-- Note: Must use style tag to specify the background image because treeshaking means custom Tailwind classes won't be included in prod css -->


{#if description}
    <label for="{id}">
        <div
                class="homepage-grid-image cursor-pointer"
                style="background-image: url('{image}');"
        >
            <div class="homepage-grid-text">
                <p>{text}</p>
            </div>
        </div>
    </label>

    <input type="checkbox" id="{id}" class="modal-toggle"/>
    <div class="modal">
        <div class="modal-box">
            <h3 class="text-lg font-bold">{text}</h3>
            <p class="py-4 directus-html">
                {@html description}
            </p>
        </div>
        <label class="modal-backdrop" for="{id}">Close</label>
    </div>
{:else}
    <div
            class="homepage-grid-image"
            style="background-image: url('{image}');"
    >
        <div class="homepage-grid-text">
            <p>{text}</p>
        </div>
    </div>
{/if}

