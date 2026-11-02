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
    <p>
        Prefer email? Write to <a class="link" href="mailto:iteusc@gmail.com">iteusc@gmail.com</a>,
        or <a class="link" href={formUrl} target="_blank" rel="noreferrer">open the form in a new tab</a>.
    </p>
    <iframe
        class="h-[1100px] w-full my-8"
        title="USC ITE contact form"
        src={formUrl}
    ></iframe>
</div>
