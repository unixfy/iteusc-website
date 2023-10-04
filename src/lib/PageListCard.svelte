<script>
    export let title;
    export let url;
    export let excerpt;
    export let date;
    export let image;
</script>

<a href="{url}" aria-label="Link to page {title}">
    <div class="lg:grid lg:grid-cols-5 rounded-lg hover:scale-105 transition-all bg-base-200 drop-shadow-xl">
        <figure><img src="{image}?width=400&format=webp" alt="Image for {title}"
                     class="object-cover w-full h-full lg:aspect-square lg:rounded-l-lg rounded-t-lg lg:rounded-tr-none"/>
        </figure>
        <div class="col-span-4 my-auto flex flex-col gap-2 p-8">
            <h2 class="card-title font-display text-xl lg:text-2xl">{title}</h2>
            <p class="font-display text-sm">Published on {date}</p>
            <p>{excerpt}</p>
        </div>
    </div>
</a>