<script>
    import PageHeader from "$lib/PageHeader.svelte";
    import {format, parseISO} from "date-fns";
    import {getStorageDirectUrl} from "$lib/directus/getStorageDirectUrl.js";

    export let data;
</script>

<PageHeader title="{data.page.title}"
            subtitle="Posted on {format(parseISO(data.page.date_created), "PPP")}">
</PageHeader>

<div class="ct pb-8 directus-html">
    {#if data.page.image}
        <img src="{getStorageDirectUrl(data.page.image)}" alt="Image for {data.page.title}">
        <div class="my-4 border border-base-300"></div>
    {/if}

    {@html data.page.content}
</div>



