<script>
    export let data;

    import { setAttr } from "$lib/directus/visualEditor.js";

    // The embed URL shows Google's framed view, so drop that flag for the full-page link
    $: formPageUrl = data.siteConfig.join_form_url?.replace(/[?&]embedded=true/, "");
</script>

<div class="bg-[url('/images/a-line.jpg')] bg-cover bg-center min-h-[50vh] flex">
    <div
        class="bg-black/60 w-full px-4 py-12 text-white flex flex-col place-content-center text-center"
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
            <p>Fill out the application form</p>
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
            <a class="link mb-4 inline-block py-3" href={formPageUrl} target="_blank" rel="noreferrer">
                Open the form in a new tab
            </a>
            <iframe
                class="h-[1150px] md:h-[950px] w-full"
                src={data.siteConfig.join_form_url}
                title="USC ITE application form"
            ></iframe>
        {:else}
            <p>No form URL defined in API!</p>
        {/if}
    </div>
</div>
