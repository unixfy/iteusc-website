<script>
    import {page} from "$app/stores";
</script>
<div class="min-h-screen flex text-center">
    <div class="m-auto space-y-4">
        <h1 class="text-2xl sm:text-3xl font-display font-bold">Oops! An error occurred.</h1>
        <div class="text-xl sm:text-2xl">
            {$page.status}
            {#if $page.error.message}
                - {$page.error.message}
            {/if}
        </div>
        <p class="mt-8">You can try refreshing the page or going back home.</p>
    </div>
</div>