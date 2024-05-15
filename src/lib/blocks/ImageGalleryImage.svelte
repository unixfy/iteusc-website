<script>
    // url for image
    export let image;
    // image caption
    export let caption;

    import { Image } from "@unpic/svelte";

    let modalOpen = false;
</script>

<!-- Image shown on page before lightbox is opened -->
<div class="flex flex-col gap-4">
    <!-- Allows the user to click on the image to open the lightbox -->
    <button on:click={() => (modalOpen = !modalOpen)} class="cursor-zoom-in">
        <!-- TODO: Automatically calculate the aspect ratio / height to suppress the unpic warning about that -->
        <Image
            src={image}
            alt={caption}
            width={1920}
            height="100%"
            class="drop-shadow-xl rounded-lg"
            cdn="directus"
        />
    </button>
    <p class="text-center italic">{caption}</p>
</div>

<!-- Lightbox -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
    class="modal modal-bottom sm:modal-middle"
    class:modal-open={modalOpen}
    id="lightbox"
>
    <div class="modal-box !max-w-[50vw]">
        <!-- "x" button to close lightbox -->
        <form method="dialog">
            <button
                class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                on:click={() => (modalOpen = !modalOpen)}>✕</button
            >
        </form>

        <h3 class="text-lg font-bold mb-2">{caption}</h3>

        <!-- User can click on image to close the lightbox -->
        <div class="flex flex-col gap-4">
            <button
                on:click={() => (modalOpen = !modalOpen)}
                class="cursor-zoom-out"
            >
                <Image
                    src={image}
                    alt={caption}
                    width={1920}
                    height="100%"
                    class="drop-shadow-xl rounded-lg"
                    cdn="directus"
                />
            </button>
        </div>
    </div>

    <!-- User can click outside the lightbox to close it too! -->
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <label
        class="modal-backdrop"
        for="lightbox"
        on:click={() => (modalOpen = !modalOpen)}>Close</label
    >
</div>
