<script>
    export let data;

    import { setAttr } from "$lib/directus/visualEditor.js";
</script>

<div class="bg-[url('/images/a-line.jpg')] bg-cover bg-center h-[50vh]">
    <div
        class="bg-black/50 h-full w-full text-white flex flex-col place-content-center text-center"
    >
        <h1 class="section-heading">Join USC ITE 👋</h1>
        <h2
            class="section-subheading"
            data-directus={setAttr({
                collection: "site_config",
                item: "797fe000-9c1f-4ed1-afaf-1c6610ed1941",
                fields: "join_statement",
                mode: "popover",
            })}
        >
            {data.siteConfig.join_statement}
        </h2>
    </div>
</div>

<!--Show steps for joining using DaisyUI components-->
<div class="ct text-center flex flex-col space-y-8 py-8">
    <h2 class="section-heading">It's so easy to join</h2>
    <ul class="steps w-full">
        <li class="step step-primary">
            <p>Join our mailing list</p>
        </li>
        <li class="step">We'll reach out with more info</li>
        <li class="step">Success!</li>
    </ul>

    <!--    Google Form iframe -->
    <div
        data-directus={setAttr({
            collection: "site_config",
            item: "797fe000-9c1f-4ed1-afaf-1c6610ed1941",
            fields: "join_form_url",
            mode: "popover",
        })}
    >
        {#if data.siteConfig.join_form_url}
            <iframe
                class="min-h-screen w-full"
                src={data.siteConfig.join_form_url}
                title="Google Form to subscribe to ITE newsletter"
            ></iframe>
        {:else}
            <p>No form URL defined in API!</p>
        {/if}
    </div>
</div>
