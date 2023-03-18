<script>
    import PageHeader from "$lib/PageHeader.svelte";

    export let data;
</script>

<PageHeader title="Admin Area" subtitle="Hello there, {data.user.displayName || data.user.email}!"></PageHeader>

<div class="ct">
    <div class="section">
        <h1 class="section-heading">Your details</h1>

        <!--        Password change -->
        <!--        Display name change -->

<!--        Sign out button -->
        <a href="/auth/logout" class="btn btn-primary">Sign out</a>

    </div>
</div>