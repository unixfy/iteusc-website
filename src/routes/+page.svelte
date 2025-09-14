<script>
    import Jumbotron from "$lib/Jumbotron.svelte";
    import GoogleCalendarEmbed from "$lib/GoogleCalendarEmbed.svelte";
    import GridImageCard from "$lib/GridImageCard.svelte";
    import QueryEmptyAlert from "$lib/QueryEmptyAlert.svelte";
    import { getStorageDirectUrl } from "$lib/directus/getStorageDirectUrl.js";

    export let data;
</script>

<!-- Page jumbotron -->
<Jumbotron />

<!-- What is USC ITE? -->
<div class="section bg-ite-blue text-white">
    <div class="ct flex flex-col space-y-4 text-xl">
        <h1 class="font-display section-subheading font-bold">
            ▶ We're shaping the future of transportation, supply chain, and
            technology.
        </h1>
        <p>
            ITE at USC is a student chapter of the global Institute of
            Transportation Engineers.
        </p>
        <p>
            We host site tours, speaker series, career, events, professional
            projects, and more. We help students broaden their view of and
            interest in the transportation field. We provide outstanding
            networking opportunities and bring awareness to the transportation
            industry. We aren't just for transportation engineers - we're really
            the <span class="font-bold"
                >Institute of Transportation Enthusiasts</span
            >.
        </p>
        <p class="font-bold">
            Most of all, we're changing the world of transportation, one student
            at a time.
        </p>
    </div>
</div>

<!-- Photos of ITE events -->
<div class="grid md:grid-rows-2 md:grid-cols-3">
    <!-- Note that we need to iterate over the image_grid_items sub-array, as the Directus API is set to just return that single field -->
    {#each data.imageGrid.image_grid_items as grid_item}
        <GridImageCard
            image="{getStorageDirectUrl(
                grid_item.image.id
            )}?width=600&format=webp&quality=50"
            text={grid_item.name}
            url={grid_item.url}
        />
    {/each}
</div>

<!-- Project listing -->
<div class="section bg-usc-cardinal text-white">
    <div class="ct">
        <h1 class="section-heading">Projects</h1>
        <h2 class="section-subheading">
            Take a look at what we're working on.
        </h2>
        <div class="mt-8 flex flex-col space-y-8">
            {#each data.projects as project}
                <!--            Tailwind card with title, subtitle, and image -->
                <div
                    class="bg-white rounded-md hover:drop-shadow-lg transition-all"
                >
                    <div class="flex flex-col md:flex-row h-full">
                        <img
                            class="w-full md:w-1/3 rounded-l-md object-cover md:aspect-video"
                            src="{getStorageDirectUrl(project.image)}?width=700&format=webp"
                            alt="Image for {project.name}"
                        />
                        <div
                            class="w-full md:w-2/3 p-8 text-black space-y-4 h-full"
                        >
                            <h3 class="text-xl font-bold">{project.name}</h3>
                            <p class="text-gray-600">{project.description}</p>
                        </div>
                    </div>
                </div>
            {:else}
                <QueryEmptyAlert />
            {/each}
            <!--    Button that links to a page listing all projects -->
            <a class="btn btn-block btn-primary btn-lg" href="/projects/"
                >View All Projects</a
            >
        </div>
    </div>
</div>

<!-- Events schedule -->
<div class="section">
    <div class="ct">
        <h1 class="section-heading">Events</h1>
        <h2 class="section-subheading">Check out what's going on.</h2>
        <!--    Google Calendar embed -->
        <GoogleCalendarEmbed minheight="500px" />

        <a class="btn btn-block btn-primary btn-lg" href="/calendar/"
            >Full Calendar</a
        >
    </div>
</div>

<!-- Join us Call to Action -->
<div class="bg-[url('/images/a-line.jpg')] bg-cover bg-center">
    <!--    Really janky way to get a black overlay over the background image -->
    <div class="w-full h-full py-[10vh] bg-black bg-opacity-30">
        <div class="flex flex-col md:flex-row ct">
            <div class="text-white text-center md:text-left pb-8 md:pb-0">
                <h1
                    class="my-auto text-3xl md:text-4xl font-bold text-white pb-4 font-display"
                >
                    What are you waiting for? Join USC ITE now!
                </h1>
                <p class="text-2xl font-display">
                    Great experiences included. <span
                        class="font-bold">Open to all USC students!</span
                    >
                </p>
            </div>
            <a
                class="btn btn-neutral glass md:ml-auto my-auto btn-lg"
                href="/join/">Join Us Now!</a
            >
        </div>
    </div>
</div>

<!-- sponsors section -->
<div class="section">
    <div class="ct">
        <h1 class="section-heading">Sponsors</h1>
        <h2 class="section-subheading">
            We're grateful to be sponsored by these organizations!
        </h2>
        <div class="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {#each data.sponsors as sponsor}
                <img
                    class="w-full"
                    src="{getStorageDirectUrl(sponsor.logo)}?height=150&format=webp"
                    alt="Logo for {sponsor.name}"
                />
                {:else}
                <QueryEmptyAlert />
            {/each}
        </div>
    </div>
</div>
