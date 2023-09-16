<script>
    export let image;
    // Hall of Fame person's name
    export let name;
    // Hall of fame person's bio
    export let bio;
</script>

<div class="flex flex-col sm:flex-row gap-8">
    <img
        src={image}
        alt="Headshot for {name}"
        class="aspect-square w-48 h-48 rounded-lg shadow-md mx-auto"
    />

    <div class="bg-base-100 p-0">
        <h2 class="text-center sm:text-left text-3xl font-medium pb-4">
            {name}
        </h2>
        <p>{bio}</p>
    </div>
</div>
