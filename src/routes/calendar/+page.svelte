<script>
    import PageHeader from "$lib/PageHeader.svelte";
    import GoogleCalendarEmbed from "$lib/GoogleCalendarEmbed.svelte";

    export let data;
</script>

<PageHeader title="Events Calendar" subtitle="See what's going on at USC ITE."></PageHeader>

<div class="ct">
    <a href={data.calendarEmbedUrl} class="btn btn-primary btn-block btn-lg" target="_blank"
       rel="noreferrer">Subscribe to our Calendar</a>

    <GoogleCalendarEmbed minheight="500px" src={data.calendarEmbedUrl}/>
</div>
