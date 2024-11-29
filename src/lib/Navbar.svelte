<script>
    let navbarItems = [
        {
            name: "Home",
            url: "/",
        },
        {
            name: "About",
            url: "/about/",
        },
        {
            name: "News",
            url: "/news/",
        },
        {
            name: "Photos",
            url: "/photos/",
        },
        {
            name: "Projects",
            url: "/projects/",
        },
        {
            name: "Calendar",
            url: "/calendar/",
        },
        {
            name: "Opportunities",
            url: "/opportunities/",
        },
        {
            name: "Resources",
            url: "/resources/",
        },
        {
            name: "Hall of Fame",
            url: "/hall-of-fame/",
        },
    ];
</script>

<div class="bg-base-200">
    <div class="ct navbar">
        <div class="navbar-start w-auto">
            <!--            Mobile menu -->
            <div class="dropdown">
                <label tabindex="0" class="btn btn-ghost lg:hidden">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 6h16M4 12h8m-8 6h16"
                        />
                    </svg>
                </label>
                <ul
                    tabindex="0"
                    class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-10"
                >
                    {#each navbarItems as navbarItem}
                        <li>
                            <a href={navbarItem.url}>{navbarItem.name}</a>
                        </li>
                    {/each}
                </ul>
            </div>
            <a class="btn btn-ghost normal-case text-xl font-display" href="/"
                >USC ITE</a>
        </div>
        <!--        Area to put stuff that should be at the middle of the navbar-->
        <div class="navbar-center hidden" />
        <!--        End of navbar (right side) - we put our navbar links here -->
        <div class="navbar-end w-full">
            <ul class="hidden lg:flex menu menu-horizontal px-1">
                {#each navbarItems as navbarItem}
                    <li>
                        <a href={navbarItem.url}>{navbarItem.name}</a>
                    </li>
                {/each}
            </ul>
            <!--            Special "join us" button -->
            <a class="btn btn-primary" href="/join/">Join Us</a>
        </div>
    </div>
</div>
