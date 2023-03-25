<script>
    // file name of image in static/images
    export let image;
    // text description overlaid on image
    export let text;
</script>
<div class="bg-[url('/images/{image}')] homepage-grid-image">
    <div class="homepage-grid-text">
        <p>{text}</p>
    </div>
</div>