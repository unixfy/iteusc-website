<script>
    export let title;
    export let subtitle;
</script>

<div class="mb-8 py-16 border-b border-base-300 bg-usc-cardinal text-white text-center md:text-left">
    <div class="ct">
        <h1 class="section-heading">{title}</h1>
        {#if subtitle}
            <h2 class="section-subheading">{subtitle}</h2>
        {/if}
    </div>
</div>