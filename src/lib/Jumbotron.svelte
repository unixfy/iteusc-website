<script>
    // One-line statement of who can join, from Directus
    export let statement;
</script>

<div class="hero min-h-[50vh] bg-[url('/images/jumbotron.jpg')] text-white bg-cover bg-center">
    <div class="bg-black/60 w-full h-full flex flex-col">
        <div class="hero-content m-auto flex-col text-center w-full py-12">
            <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-balance">USC Institute of Transportation Engineers</h1>
            <p class="text-xl md:text-2xl lg:text-3xl font-display text-balance">We are transportation engineers, planners, and enthusiasts.</p>
            {#if statement}
                <p class="text-lg text-balance">{statement}</p>
            {/if}
            <div class="flex flex-wrap justify-center gap-4 pt-4">
                <a class="btn btn-accent btn-lg" href="/join/">Join USC ITE</a>
                <a class="btn btn-outline btn-lg border-white text-white hover:bg-white hover:text-black" href="#about">Learn more</a>
            </div>
        </div>
    </div>
</div>
