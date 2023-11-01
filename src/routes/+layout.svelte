<script>
    import "../app.css";
    import Navbar from "$lib/Navbar.svelte";
    import Footer from "$lib/Footer.svelte";
    import { page } from "$app/stores";
    import { fade } from 'svelte/transition';
    import { sineIn, sineOut } from "svelte/easing";

    // Import fonts
    import "@fontsource/overpass/400.css";
    import "@fontsource/overpass/700.css";
    import "@fontsource/rubik/400.css";
    import "@fontsource/rubik/700.css";
    import "@fontsource/rubik/300.css";

    export let data;

    let defaultTitle = "Welcome";
    let defaultDescription =
        "The Institute of Transportation Engineers (ITE) at the University of Southern California is a chapter of the national ITE. We're devoted to hosting site tours, holding speaker sessions, sharing our passion for transportation, and changing the world of mobility - one Trojan at a time.";
</script>

<svelte:head>
    <!--    Interpolate page title if it's returned in each page's load() function, otherwise just show the value of defaultTitle -->
    <!--    This pattern of handling it ensures things will work even when JavaScript is not enabled in the client -->
    <title>{$page.data.title || defaultTitle} | USC ITE</title>
    <!--    Interpolate page meta description if it's returned in the page's load() function, otherwise just return defaultMetaDescription. -->
    <meta
        name="description"
        content={$page.data.description || defaultDescription}
    />

    <!-- OpenGraph meta tags -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://iteusc.com{$page.url.pathname}" />
    <meta
        property="og:title"
        content="{$page.data.title || defaultTitle} | USC ITE"
    />
    <meta
        property="og:description"
        content={$page.data.description || defaultDescription}
    />
    <meta property="og:image" content="{$page.data.socialImage || '/images/ite-portland.jpg'}" />

    <!-- Twitter meta tags -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://iteusc.com{$page.url.pathname}" />
    <meta
        property="twitter:title"
        content="{$page.data.title || defaultTitle} | USC ITE"
    />
    <meta
        property="twitter:description"
        content={$page.data.description || defaultDescription}
    />
    <meta property="twitter:image" content="{$page.data.socialImage || '/images/ite-portland.jpg'}" />

    <!--    Send the meta tag that blocks robots from indexing, if we specify that this tag should be sent in page load() function -->
    {#if $page.data.noIndex}
        <meta name="robots" content="noindex, nofollow" />
    {/if}
</svelte:head>

<!--Insert Navbar component-->
<Navbar />

<!--Ensure the page container is at least 100vh high (that way the footer will always be below-the-fold)-->
<div class="min-h-screen pb-8">
    {#key data.url}
        <div
        in:fade={{ duration: 200, delay: 200, easing: sineOut }}
        out:fade={{ duration: 200, easing: sineIn }}
        >
            <slot />
        </div>
    {/key}
</div>

<!--Insert footer component-->
<Footer />
