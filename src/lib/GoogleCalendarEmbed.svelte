<script>
    // iframe's minimum height
    export let minheight;
    // calendar embed URL from Directus
    export let src;
</script>

<!--iFrame embed for Google Calendar-->
<iframe class="w-full aspect-square md:aspect-video my-8"
        style="min-height: {minheight}"
        src={src}
        title="Google Calendar embed showing ITE USC events"></iframe>
