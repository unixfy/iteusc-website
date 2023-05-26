<script>
    import {auth} from "$lib/firebase/client.js";
    import {signInWithEmailAndPassword} from "firebase/auth";

    let username;
    let password;

    // Store any error message, to be shown when an error occurs (i.e., when error is truthy)
    let error = '';

    async function submitSignIn(username, password) {
        try {
            await signInWithEmailAndPassword(auth, username, password)

            // This is a SUPER janky way to prevent a race condition with the onTokenChanged hook in hooks.client.js
            // but I guess it works for now
            setTimeout(() => window.location.href = '/admin', 250);
        } catch (e) {
            error = e;
        }
    }
</script>

<div class="ct flex h-[100vh]">
    <div class="flex flex-col md:flex-row m-auto border border-base-300 rounded-xl shadow-xl bg-base-200">
        <!--        Left side image -->
        <div class="md:w-1/2">
            <img src="/images/gotransit.jpg" alt="GO Transit"
                 class="object-cover rounded-t-xl w-full max-h-[30vh] md:max-h-full md:rounded-none md:rounded-l-xl">
        </div>

        <div class="md:w-1/2 m-8 flex flex-col">
            <div class="md:w-4/5 m-auto flex flex-col space-y-4">
                {#if error}
                    <div class="alert alert-error">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6"
                                 fill="none"
                                 viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            <span>Login failed. {error}</span>
                        </div>
                    </div>
                {/if}

                <h1 class="text-center md:text-left text-2xl md:text-3xl">🚇 Hello there! Please sign in.</h1>

                <form class="flex flex-col space-y-4" onsubmit="return false;">
                    <!--        Username input-->
                    <div class="form-control">
                        <label class="label" for="username">
                            <span class="label-text">Username</span>
                        </label>
                        <input type="email" placeholder="admin@iteusc.com" class="input input-bordered w-full"
                               id="username"
                               name="username" required bind:value={username}/>
                    </div>
                    <!--        Pw input -->
                    <div class="form-control">
                        <label class="label" for="password">
                            <span class="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="iliketrains123" class="input input-bordered w-full"
                               id="password"
                               name="password" required bind:value={password}/>
                    </div>

                    <button class="btn btn-secondary btn-lg" on:click={() => submitSignIn(username, password)}>Submit
                    </button>
                </form>

            </div>
        </div>
    </div>
</div>