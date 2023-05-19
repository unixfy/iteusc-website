<script>
    // file name of image in static/images
    export let image;
    // text description overlaid on image
    export let text;
</script>

<!-- Note: Must use style tag to specify the background image because treeshaking means custom Tailwind classes won't be included in prod css -->
<div
    class="homepage-grid-image"
    style="background-image: url('{image}');"
>
    <div class="homepage-grid-text">
        <p>{text}</p>
    </div>
</div>
