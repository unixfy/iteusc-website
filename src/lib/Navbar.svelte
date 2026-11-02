<script>
    import { page } from "$app/state";
    import { afterNavigate } from "$app/navigation";

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

    let menuOpen = false;
    let menu;

    // Match the section as well as the page itself, e.g. /about/leadership-team/x -> About
    const isCurrent = (url, pathname) =>
        url === "/" ? pathname === "/" : `${pathname}/`.startsWith(url);

    afterNavigate(() => {
        menuOpen = false;
    });

    function handleKeydown(event) {
        // Read the element, not menuOpen: the binding only updates on the async toggle event
        if (event.key === "Escape" && menu.open) {
            menu.open = false;
            menu.querySelector("summary").focus();
        }
    }

    function handleWindowClick(event) {
        if (menu.open && !menu.contains(event.target)) {
            menu.open = false;
        }
    }
</script>

<svelte:window on:keydown={handleKeydown} on:click={handleWindowClick} />

<header class="sticky top-0 z-30 bg-base-200">
    <div class="ct navbar">
        <div class="navbar-start w-auto">
            <!--            Mobile menu. <details> keeps it working before hydration and gives us the expanded state natively -->
            <details class="dropdown lg:hidden" bind:open={menuOpen} bind:this={menu}>
                <summary
                    class="btn btn-ghost h-11 min-w-11 list-none [&::-webkit-details-marker]:hidden"
                    aria-label="Menu"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 6h16M4 12h8m-8 6h16"
                        />
                    </svg>
                </summary>
                <nav aria-label="Main" class="dropdown-content z-10 mt-3">
                    <ul class="menu w-56 rounded-box bg-base-100 p-2 shadow">
                        {#each navbarItems as navbarItem}
                            <li>
                                <a
                                    class="min-h-11 items-center"
                                    class:menu-active={isCurrent(navbarItem.url, page.url.pathname)}
                                    aria-current={isCurrent(navbarItem.url, page.url.pathname) ? "page" : undefined}
                                    href={navbarItem.url}>{navbarItem.name}</a
                                >
                            </li>
                        {/each}
                    </ul>
                </nav>
            </details>
            <a class="btn btn-ghost h-11 gap-2 px-2 text-xl normal-case font-display" href="/">
                <img src="/images/favicon.svg" alt="" class="h-8 w-8" width="32" height="32" />
                USC ITE
            </a>
        </div>
        <!--        End of navbar (right side) - we put our navbar links here -->
        <div class="navbar-end w-full">
            <nav aria-label="Main" class="hidden lg:block">
                <ul class="menu menu-horizontal px-1">
                    {#each navbarItems as navbarItem}
                        <li>
                            <a
                                class:menu-active={isCurrent(navbarItem.url, page.url.pathname)}
                                aria-current={isCurrent(navbarItem.url, page.url.pathname) ? "page" : undefined}
                                href={navbarItem.url}>{navbarItem.name}</a
                            >
                        </li>
                    {/each}
                </ul>
            </nav>
            <!--            Special "join us" button -->
            <a class="btn btn-primary h-11" href="/join/">Join Us</a>
        </div>
    </div>
</header>
