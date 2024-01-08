<script>
    export let url;
    export let image;
    export let name;
    export let date;
</script>

<a href={url} target="_blank" rel="noreferrer">
    <div class="relative md:hover:scale-105 transition-all drop-shadow-lg">
        <img
            src={image}
            alt={name}
            class="w-full h-full object-cover object-center rounded-lg aspect-video sm:aspect-square"
            loading="lazy"
            width="auto"
            height="100%"
        />
        <div
            class="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 rounded-b-lg text-white backdrop-blur-sm backdrop-brightness-90"
        >
            <p class="font-bold text-lg">{name}</p>
            <p class="text-sm">
                {date}
            </p>
        </div>
    </div>
</a>
