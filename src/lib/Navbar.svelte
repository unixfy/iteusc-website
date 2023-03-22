<script>
    let navbarItems = [
        {
            "name": "Home",
            "url": "/"
        },
        {
            "name": "About",
            "url": "/about/"
        },
        {
            "name": "Calendar",
            "url": "/calendar/"
        },
        {
            "name": "Opportunities",
            "url": "/opportunities/"
        },
        {
            "name": "Projects",
            "url": "/projects/"
        },
    ]
</script>
<div class="bg-base-200">
    <div class="ct navbar">
        <div class="navbar-start">
            <div class="dropdown">
                <label tabindex="0" class="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M4 6h16M4 12h8m-8 6h16"/>
                    </svg>
                </label>
                <ul tabindex="0"
                    class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                    {#each navbarItems as navbarItem}
                        <li>
                            <a href="{navbarItem.url}">{navbarItem.name}</a>
                        </li>
                    {/each}
                </ul>
            </div>
            <!--        long name on desktop, short name on mobile-->
            <a class="btn btn-ghost normal-case text-xl hidden lg:flex" href="/">USC Institute of Transportation
                Engineers</a>
            <a class="btn btn-ghost normal-case text-xl lg:hidden" href="/">USC ITE</a>
        </div>
        <div class="navbar-center hidden lg:flex">
        </div>
        <div class="navbar-end">
            <ul class="hidden lg:flex menu menu-horizontal px-1">
                {#each navbarItems as navbarItem}
                    <li>
                        <a href="{navbarItem.url}">{navbarItem.name}</a>
                    </li>
                {/each}
            </ul>
            <a class="btn" href="/join/">Join Us</a>
        </div>
    </div>

</div>