<div class="ct">
    <div class="border rounded-md p-8 my-8 max-w-lg">
        <h1 class="text-2xl">👋 Hello! Please sign in</h1>

        <form class="flex flex-col space-y-4" method="POST">
            <!--        Username input-->
            <div class="form-control">
                <label class="label" for="username">
                    <span class="label-text">Username</span>
                </label>
                <input type="email" placeholder="admin@iteusc.com" class="input input-bordered w-full" id="username" name="username"/>
            </div>
            <!--        Pw input -->
            <div class="form-control">
                <label class="label" for="password">
                    <span class="label-text">Password</span>
                </label>
                <input type="password" placeholder="Password" class="input input-bordered w-full" id="password" name="password"/>
            </div>

            <button class="btn btn-primary btn-lg">Submit</button>
        </form>

    </div>
</div>