<script>
    import PageHeader from "$lib/PageHeader.svelte";
    import {signOut} from "$lib/firebase/auth.js";

    export let data;
</script>

<PageHeader title="Admin Area" subtitle="Hello there, {data.user.displayName || data.user.email}!"></PageHeader>

<div class="ct">
    <div class="section">
        <h1 class="section-heading">Admin interfaces</h1>
        <!--        Button linking to /admin/opportunities, to manage opportunities -->
        <a href="/admin/opportunities" class="btn btn-primary">Manage opportunities</a>
        <!--        Button linking to /admin/projects, to manage projects -->
        <a href="/admin/projects" class="btn btn-primary">Manage projects</a>

        <h1 class="section-heading">Your details</h1>

        <!--        Password change -->
        <!--        Display name change -->

        <!--        Sign out button -->
        <button class="btn btn-primary" on:click={() => signOut()}>Sign out</button>

    </div>
</div>