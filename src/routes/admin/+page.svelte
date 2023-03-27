<script>
    import PageHeader from "$lib/PageHeader.svelte";
    import {signOut} from "$lib/firebase/auth.js";

    export let data;
</script>

<PageHeader title="Admin Area" subtitle="Hello there, {data.user.displayName || data.user.email}!"></PageHeader>

<div class="ct">
    <div class="section">
        <h1 class="section-heading">Your details</h1>

        <!--        Password change -->
        <!--        Display name change -->

<!--        Sign out button -->
        <button class="btn btn-primary" on:click={() => signOut()}>Sign out</button>

    </div>
</div>