<script>
    import PageHeader from "$lib/PageHeader.svelte";
</script>

<div class="ct">
    <PageHeader title="Events Calendar" subtitle="See what's going on at USC ITE."></PageHeader>

    <iframe class="w-full min-h-[500px] md:aspect-square mb-8"
            src="https://calendar.google.com/calendar/u/0/embed?src=iteusc@gmail.com&ctz=America/Los_Angeles"
            title="Google Calendar embed showing ITE USC events"></iframe>
</div>