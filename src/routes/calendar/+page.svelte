<script>
    import PageHeader from "$lib/PageHeader.svelte";
    import GoogleCalendarEmbed from "$lib/GoogleCalendarEmbed.svelte";
    import {setAttr} from "$lib/directus/visualEditor.js";
    export let data;
</script>

<PageHeader title="Events Calendar" subtitle="See what's going on at USC ITE."></PageHeader>

<div class="ct"             data-directus={setAttr({
                collection: "site_config",
                item: "797fe000-9c1f-4ed1-afaf-1c6610ed1941",
                fields: "calendar_embed_url",
                mode: "popover",
            })}>
    <a href={data.calendarEmbedUrl} class="btn btn-primary btn-block btn-lg" target="_blank"
       rel="noreferrer">Subscribe to our Calendar</a>

    <GoogleCalendarEmbed minheight="500px" src={data.calendarEmbedUrl}/>
</div>
