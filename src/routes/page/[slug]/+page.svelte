<script>
    import PageHeader from "$lib/PageHeader.svelte";
    import {format, parseISO} from "date-fns";
    import {getStorageDirectUrl} from "$lib/directus/getStorageDirectUrl.js";

    export let data;
</script>


<div class="bg-usc-cardinal text-white py-6">
    <div class="narrow-ct">
        <div class="breadcrumbs mb-4 overflow-hidden font-display">
            <ul>
                <li><a href="/">USC ITE</a></li>
                <li><a href="/news">News</a></li>
                <li>{data.page.title}</li>
            </ul>
        </div>

        <div>
            <h1 class="section-heading">{data.page.title}</h1>
            <p class="section-subheading">Posted {format(parseISO(data.page.date_posted), "LLLL d, y")} by {data.page.author.name}</p>
        </div>
    </div>
</div>

<div class="narrow-ct directus-html">

    {#if data.page.image}
        <img src="{getStorageDirectUrl(data.page.image)}?format=webp" alt="Image for {data.page.title}">
        <div class="my-4 border border-base-300"></div>
    {/if}

    {@html data.page.content}
</div>

<div class="narrow-ct p-8 bg-base-300 rounded-xl">
    <h2 class="section-subheading">About the author</h2>
    <p class="p-readable">{@html data.page.author.bio}</p>
</div>





