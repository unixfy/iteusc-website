<script>
    import PageHeader from "$lib/PageHeader.svelte";
    import {signOut} from "$lib/firebase/auth.js";
    import {PUBLIC_FIREBASE_PROJECT_ID} from "$env/static/public";

    export let data;
    export let form;
</script>

<PageHeader title="Admin Area" subtitle="Hello there, {data.user.displayName || data.user.email}!"></PageHeader>

<div class="ct">
    <!--    Success/failure messages -->
    {#if form?.success}
        <div class="alert alert-success my-8">
            <div>
                <span class="font-bold">Success! </span> Your action succeeded.
            </div>
        </div>
    {/if}
    {#if form?.error}
        <div class="alert alert-error my-8">
            <div>
                <span class="font-bold">Error! </span> Your action failed: {form?.error}
            </div>
        </div>
    {/if}

    <div class="flex flex-col space-y-4">
        <h1 class="section-heading">Manage this site</h1>

        <!--        Link to /admin/opportunities, to manage opportunities -->
        <a href="/admin/opportunities">
            <div class="card bg-base-200 hover:bg-base-300">
                <div class="card-body">
                    <h2 class="card-title">Manage Opportunities</h2>
                </div>
            </div>
        </a>

        <!--        Link to /admin/projects, to manage projects -->
        <a href="/admin/projects">
            <div class="card bg-base-200 hover:bg-base-300">
                <div class="card-body">
                    <h2 class="card-title">Manage Projects</h2>
                </div>
            </div>
        </a>

        <!--        Link to /admin/team-members, to manage team members -->
        <a href="/admin/team-members">
            <div class="card bg-base-200 hover:bg-base-300">
                <div class="card-body">
                    <h2 class="card-title">Update Team Members</h2>
                </div>
            </div>
        </a>

        <!--        Link to /admin/image-grid, to manage homepage image grid -->
        <a href="/admin/image-grid">
            <div class="card bg-base-200 hover:bg-base-300">
                <div class="card-body">
                    <h2 class="card-title">Update Homepage Image Grid</h2>
                </div>
            </div>
        </a>

        <!--        Link to Firebase console -->
        <a href="https://console.firebase.google.com/project/{PUBLIC_FIREBASE_PROJECT_ID}/overview" target="_blank"
           rel="noreferrer">
            <div class="card bg-base-200 hover:bg-base-300">
                <div class="card-body">
                    <h2 class="card-title">Firebase Console (for {PUBLIC_FIREBASE_PROJECT_ID})</h2>
                </div>
            </div>
        </a>
    </div>
    <div class="section">
        <h1 class="section-heading">Update your profile</h1>

        <form action="?/updateUser" method="post" class="flex flex-col space-y-4 max-w-xl bg-base-200 p-6 rounded-xl">
            <!--            Display user UID -->
            <p class="text-sm text-gray-500">User ID: {data.user.uid}</p>

            <!--        Email change -->
            <div class="form-control w-full">
                <label class="label">
                    <span class="label-text">Email</span>
                </label>
                <input type="email" name="email" class="input input-bordered w-full"
                       value="{data.user.email}" required/>
                <label class="label">
                    <span class="label-text font-bold text-red-800">Changing email will log you out</span>
                </label>
            </div>

            <!--        Password change -->
            <div class="form-control w-full">
                <label class="label">
                    <span class="label-text">Password</span>
                </label>
                <input type="password" name="password" class="input input-bordered w-full"/>
                <label class="label">
                    <span class="label-text font-bold text-red-800">Blank to leave unchanged - changing password will log you out</span>
                </label>
            </div>

            <button type="submit" class="btn btn-primary">Update</button>
        </form>

        <!--        Sign out button -->
        <button class="btn btn-primary btn-lg mt-8" on:click={() => signOut()}>Sign out</button>

    </div>
</div>