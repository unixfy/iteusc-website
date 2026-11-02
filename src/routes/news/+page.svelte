<script>
    import { onMount } from "svelte";
    import PageHeader from "$lib/PageHeader.svelte";
    import QueryEmptyAlert from "$lib/QueryEmptyAlert.svelte";
    import { format, parseISO } from "date-fns";
    import PageListCard from "$lib/PageListCard.svelte";
    import { getStorageDirectUrl } from "$lib/directus/getStorageDirectUrl.js";
    import makeAuthorsNameString from "$lib/directus/makeAuthorsNameString.js";
    import { queryParameters } from "sveltekit-search-params";

    const searchParams = queryParameters(
        { search: true },
        { debounceHistory: 500 },
    );
    export let data;

    const PAGE_SIZE = 12;
    let limit = PAGE_SIZE;
    // Show everything until hydrated, because "Show more" can't work without JS
    let hydrated = false;

    onMount(() => (hydrated = true));

    // Every new search starts from the top of its results
    $: data.items, (limit = PAGE_SIZE);
    $: visibleItems = hydrated ? data.items.slice(0, limit) : data.items;
    $: resultCount = data.items.length === 1 ? "1 result" : `${data.items.length} results`;
</script>

<PageHeader title="News" subtitle="Keep up with our events and happenings." />

<div class="ct">
    <!-- daisyui text input -->
    <label class="input input-lg flex items-center gap-2 mb-4 w-full">
        <!-- note that we get the value from searchParams rather than $search to prevent the value from changing as the page is navigating (leads to rubberbanding in the search bar) -->
        <input
            class="grow"
            aria-label="Search news"
            placeholder="Search"
            value={searchParams.search}
            autocomplete="off"
            type="search"
            spellcheck="true"
            on:input={(e) => (searchParams.search = e.target.value)}
        />
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="h-4 w-4 opacity-70"
            aria-hidden="true"
        >
            <path
                fill-rule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clip-rule="evenodd"
            />
        </svg>
    </label>

    <p class="sr-only" role="status">{resultCount}</p>

    <div class="flex flex-col gap-8">
        {#each visibleItems as item}
            <PageListCard
                title={item.title}
                url="/page/{item.slug}"
                excerpt={item.excerpt}
                date={format(parseISO(item.date_posted), "LLLL d, y")}
                author_name={makeAuthorsNameString(item.people)}
                image="{getStorageDirectUrl(
                    item.image,
                )}?format=webp&quality=50&width=400"
            ></PageListCard>
        {:else}
            <div class="alert">
                <span>No results found!</span>
            </div>
        {/each}
    </div>

    {#if visibleItems.length < data.items.length}
        <div class="mt-8 text-center">
            <button class="btn btn-outline btn-lg" on:click={() => (limit += PAGE_SIZE)}>
                Show more ({data.items.length - visibleItems.length} left)
            </button>
        </div>
    {/if}
</div>
