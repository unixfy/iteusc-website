<script>
    import PageHeader from "$lib/PageHeader.svelte";

    const formUrl =
        "https://us17.list-manage.com/contact-form?u=0b0f9abcfdce6d20a98515274&form_id=d7d8b612580a749bf7e39b257458da16";
</script>

<PageHeader
    title="Contact Us"
    subtitle="Learn more about or work with our ITE chapter."
></PageHeader>

<div class="ct">
    <a class="link inline-block py-3" href={formUrl} target="_blank" rel="noreferrer">
        Open the form in a new tab
    </a>
    <iframe
        class="h-[1100px] w-full my-8"
        title="USC ITE Mailchimp contact form"
        src={formUrl}
    ></iframe>
</div>
