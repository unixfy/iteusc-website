<script>
    import PageHeader from "$lib/PageHeader.svelte";
    import QueryEmptyAlert from "$lib/QueryEmptyAlert.svelte";
    import {format, parseISO} from "date-fns";
    import PageListCard from "$lib/PageListCard.svelte";
    import {getStorageDirectUrl} from "$lib/directus/getStorageDirectUrl.js";

    export let data;
</script>

<PageHeader title="News" subtitle="Keep up with our events and happenings."/>

<div class="pb-8 ct">
    <div class="flex flex-col gap-8">
        {#each data.items as item}
            <PageListCard title="{item.title}"
                          url="/page/{item.slug}"
                          excerpt="{item.excerpt}"
                          date='{format(parseISO(item.date_posted), "LLLL d, y")}'
                          author="{item.author.name}"
                          image="{getStorageDirectUrl(item.image)}?format=webp&quality=50&width=400"
            >
            </PageListCard>
        {:else}
            <QueryEmptyAlert/>
        {/each}
    </div>
</div>