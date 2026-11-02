<script>
    import {page} from "$app/stores";
</script>
<div class="min-h-screen flex text-center">
    <div class="mt-8 mx-auto space-y-4 p-8">
        <!--        Show easter egg image-->
        <img src="/images/oops.jpg" alt="Oops! Delayed" class="max-h-96 rounded shadow-xl"/>
        <h1 class="text-2xl sm:text-3xl font-display font-bold">Oops! We've had a problem...</h1>

        <!--        Display error message from SvelteKit -->
        <div class="text-xl sm:text-2xl">
            {$page.status}
            {#if $page.error.message}
                - {$page.error.message}
            {/if}
        </div>
        <p class="mt-8">You can try refreshing the page or going back <a href="/" class="link">home</a>.</p>
        <p class="text-sm italic font-light">Props if you recognize what this image is ;)</p>
    </div>
</div>