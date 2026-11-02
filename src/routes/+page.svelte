<script>
    import Jumbotron from "$lib/Jumbotron.svelte";
    import GoogleCalendarEmbed from "$lib/GoogleCalendarEmbed.svelte";
    import GridImageCard from "$lib/GridImageCard.svelte";
    import QueryEmptyAlert from "$lib/QueryEmptyAlert.svelte";
    import { getStorageDirectUrl } from "$lib/directus/getStorageDirectUrl.js";
    import { setAttr } from "$lib/directus/visualEditor.js";

    export let data;
</script>

<!-- Page jumbotron -->
<Jumbotron />

<!-- What is USC ITE? -->
<div class="section bg-ite-blue text-white">
    <div class="ct">
        <h2
            class="font-display section-subheading font-bold max-w-4xl"
            data-directus={setAttr({
                collection: "site_config",
                item: "797fe000-9c1f-4ed1-afaf-1c6610ed1941",
                fields: "homepage_organization_tagline",
                mode: "popover",
            })}
        >
            ▶ {data.siteConfig.homepage_organization_tagline}
        </h2>

        <div
            class="flex max-w-3xl flex-col space-y-4 text-lg"
            data-directus={setAttr({
                collection: "site_config",
                item: "797fe000-9c1f-4ed1-afaf-1c6610ed1941",
                fields: "homepage_organization_description",
                mode: "popover",
            })}
        >
            {@html data.siteConfig.homepage_organization_description}
        </div>
    </div>
</div>

<!-- Photos of ITE events -->
<div
    class="grid md:grid-rows-2 md:grid-cols-3"
    data-directus={setAttr({
        collection: "site_config",
        item: "797fe000-9c1f-4ed1-afaf-1c6610ed1941",
        fields: "notice-xcpkuw,image_grid_items",
        mode: "modal",
    })}
>
    <!-- Note that we need to iterate over the image_grid_items sub-array, as the Directus API is set to just return that single field -->
    {#each data.imageGrid.image_grid_items as grid_item}
        <GridImageCard
            image="{getStorageDirectUrl(
                grid_item.image.id,
            )}?width=600&format=webp&quality=50"
            text={grid_item.name}
            url={grid_item.url}
        />
    {/each}
</div>

<!-- Project listing -->
<div class="section bg-usc-cardinal text-white">
    <div class="ct">
        <h2 class="section-heading">Projects</h2>
        <p class="section-subheading">
            Take a look at what we're working on.
        </p>
        <div class="mt-8 flex flex-col space-y-8">
            {#each data.projects as project}
                <!--            Tailwind card with title, subtitle, and image -->
                <div
                    class="bg-base-100 rounded-md hover:drop-shadow-lg transition-all"
                >
                    <div class="flex flex-col md:flex-row h-full">
                        <img
                            class="w-full md:w-1/3 rounded-t-md md:rounded-t-none md:rounded-l-md object-cover md:aspect-video"
                            src="{getStorageDirectUrl(
                                project.image,
                            )}?width=700&format=webp"
                            alt="Image for {project.name}"
                        />
                        <div
                            class="w-full md:w-2/3 p-8 text-base-content space-y-4 h-full"
                        >
                            <h3 class="text-xl font-bold">{project.name}</h3>
                            <p class="text-base-content/70">{project.description}</p>
                        </div>
                    </div>
                </div>
            {:else}
                <QueryEmptyAlert />
            {/each}
            <!--    Button that links to a page listing all projects -->
            <a class="btn btn-outline btn-lg self-start border-white text-white hover:bg-white hover:text-usc-cardinal" href="/projects/"
                >View All Projects</a
            >
        </div>
    </div>
</div>

<!-- Events schedule -->
<div class="section">
    <div class="ct">
        <h2 class="section-heading">Events</h2>
        <p class="section-subheading">Check out what's going on.</p>
        <!--    Google Calendar embed -->
        <div
            data-directus={setAttr({
                collection: "site_config",
                item: "797fe000-9c1f-4ed1-afaf-1c6610ed1941",
                fields: "calendar_embed_url",
                mode: "popover",
            })}
        >
            <GoogleCalendarEmbed
                minheight="500px"
                src={data.siteConfig.calendar_embed_url}
            />
        </div>
        <a class="btn btn-outline btn-lg" href="/calendar/"
            >Full Calendar</a
        >
    </div>
</div>

<!-- Join us Call to Action -->
<div class="bg-[url('/images/a-line.jpg')] bg-cover bg-center">
    <!--    Really janky way to get a black overlay over the background image -->
    <div class="w-full h-full py-[10vh] bg-black/60">
        <div class="flex flex-col md:flex-row ct">
            <div class="text-white text-center md:text-left pb-8 md:pb-0">
                <h2
                    class="my-auto text-3xl md:text-4xl font-bold text-white pb-4 font-display"
                >
                    What are you waiting for? Join USC ITE now!
                </h2>
                <p
                    class="text-2xl font-display"
                    data-directus={setAttr({
                        collection: "site_config",
                        item: "797fe000-9c1f-4ed1-afaf-1c6610ed1941",
                        fields: "join_statement",
                        mode: "popover",
                    })}
                >
                    {data.siteConfig.join_statement}
                </p>
            </div>
            <a
                class="btn btn-accent md:ml-auto my-auto btn-lg"
                href="/join/">Join Us Now!</a
            >
        </div>
    </div>
</div>

<!-- sponsors section -->
<div class="section">
    <div class="ct">
        <h2 class="section-heading">Sponsors</h2>
        <p class="section-subheading">
            We're grateful to be sponsored by these organizations!
        </p>
        <div class="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {#each data.sponsors as sponsor}
                <div
                    class="flex items-center rounded-md bg-white p-4"
                    data-directus={setAttr({
                        collection: "sponsors",
                        item: sponsor.id,
                        fields: "",
                        mode: "modal",
                    })}
                >
                    <img
                        class="w-full"
                        src="{getStorageDirectUrl(
                            sponsor.logo,
                        )}?height=150&format=webp"
                        alt="Logo for {sponsor.name}"
                    />
                </div>
            {:else}
                <QueryEmptyAlert />
            {/each}
        </div>
    </div>
</div>
