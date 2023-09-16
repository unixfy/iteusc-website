<script>
    export let image;
    // Hall of Fame person's name
    export let name;
    // Hall of fame person's bio
    export let bio;
</script>

<div class="flex flex-col sm:flex-row gap-8 align-items-center">
    <img src={image} alt="Headshot for {name}" class="aspect-square h-48" />

    <div class="bg-base-100 p-0">
            <h2 class="text-3xl font-medium pb-4">{name}</h2>
            <p>{bio}</p>
    </div>
</div>
