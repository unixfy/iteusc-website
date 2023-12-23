<script>
    // uuid of image
    export let id;
    // file name of image in static/images
    export let image;
    // text description overlaid on image
    export let text;
    // url that this image leads to
    export let url;
</script>

<!-- Note: Must use style tag to specify the background image because treeshaking means custom Tailwind classes won't be included in prod css -->

<a href={url} target="_blank" rel="noreferrer">
    <div class="homepage-grid-image" style="background-image: url('{image}');">
        <div class="homepage-grid-text">
            <p>{text}</p>
        </div>
    </div>
</a>
