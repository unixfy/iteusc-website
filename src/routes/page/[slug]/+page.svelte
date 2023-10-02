<script>
    import PageHeader from "$lib/PageHeader.svelte";
    import {format, parseISO} from "date-fns";

    export let data;
</script>

<PageHeader title="{data.page.title}"
            subtitle="Posted on {format(parseISO(data.page.date_created), "PPP")}">
</PageHeader>

<div class="ct pb-8 page-content">
    {#if data.page.image}
        <img src="//iteusc-backend.unixfy.net/assets/{data.page.image}?width=800" alt="Image for {data.page.title}">
        <div class="my-4 border border-base-300"></div>
    {/if}

    {@html data.page.content}
</div>



