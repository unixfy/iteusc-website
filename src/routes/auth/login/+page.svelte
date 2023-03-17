<script>
    export let form;
</script>

<div class="ct flex flex-col p-8 space-y-8">
    {#if form?.error === true}
        <div class="alert alert-error">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none"
                     viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>Login failed. {form?.message}</span>
            </div>
        </div>
    {/if}

    <div class="border rounded-md p-8 m-auto">
        <h1 class="text-2xl">👋 Hello! Please sign in</h1>

        <form class="flex flex-col space-y-4" method="POST">
            <!--        Username input-->
            <div class="form-control">
                <label class="label" for="username">
                    <span class="label-text">Username</span>
                </label>
                <input type="email" placeholder="admin@iteusc.com" class="input input-bordered w-full" id="username"
                       name="username" required/>
            </div>
            <!--        Pw input -->
            <div class="form-control">
                <label class="label" for="password">
                    <span class="label-text">Password</span>
                </label>
                <input type="password" placeholder="Password" class="input input-bordered w-full" id="password"
                       name="password" required/>
            </div>

            <button class="btn btn-primary btn-lg">Submit</button>
        </form>

    </div>
</div>