<script>
    import PageHeader from "$lib/PageHeader.svelte";
    import GoogleCalendarEmbed from "$lib/GoogleCalendarEmbed.svelte";
</script>

<PageHeader title="Events Calendar" subtitle="See what's going on at USC ITE."></PageHeader>

<div class="ct">
    <div class="alert alert-info text-info-content">
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                 class="stroke-current flex-shrink-0 w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>You can subscribe to our calendar by clicking <a href="https://calendar.google.com/calendar/u/0/r?cid=iteusc@gmail.com" class="link" target="_blank" rel="noreferrer">here</a>. </span>
        </div>
    </div>

    <GoogleCalendarEmbed minheight="500px"/>
</div>