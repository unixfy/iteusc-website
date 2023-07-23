<script>
    import PageHeader from "$lib/PageHeader.svelte";
    import GoogleCalendarEmbed from "$lib/GoogleCalendarEmbed.svelte";
</script>

<PageHeader title="Events Calendar" subtitle="See what's going on at USC ITE."></PageHeader>

<div class="ct">
    <a href="https://calendar.google.com/calendar/u/0/r?cid=iteusc%40gmail.com" class="btn btn-primary btn-block btn-lg" target="_blank"
       rel="noreferrer">Subscribe to our Calendar</a>

    <GoogleCalendarEmbed minheight="500px"/>
</div>