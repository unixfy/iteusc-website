<script>
    export let url;
    export let image;
    export let name;
    export let date;

    // Some originals can't be resized by the CMS, so retry without the transform
    let failedOnce = false;
    let failed = false;

    function handleImageError() {
        if (!failedOnce) {
            failedOnce = true;
            image = image.split("?")[0];
        } else {
            failed = true;
        }
    }
</script>

<a href={url} target="_blank" rel="noreferrer">
    <div class="relative md:hover:scale-105 transition-all drop-shadow-lg">
        {#if failed}
            <div class="w-full rounded-lg bg-neutral aspect-video sm:aspect-square"></div>
        {:else}
            <img
                src={image}
                alt=""
                class="w-full h-full object-cover object-center rounded-lg aspect-video sm:aspect-square"
                loading="lazy"
                width="auto"
                height="100%"
                on:error={handleImageError}
            />
        {/if}
        <div
            class="absolute bottom-0 left-0 right-0 p-4 bg-black/75 rounded-b-lg text-white backdrop-blur-sm backdrop-brightness-90"
        >
            <p class="font-bold text-lg">{name}</p>
            <p class="text-sm">
                {date}
            </p>
        </div>
    </div>
</a>
