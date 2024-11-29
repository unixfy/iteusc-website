<script>
    import PageHeader from "$lib/PageHeader.svelte";
    import QueryEmptyAlert from "$lib/QueryEmptyAlert.svelte";
    import { format, parseISO } from "date-fns";
    import PageListCard from "$lib/PageListCard.svelte";
    import { getStorageDirectUrl } from "$lib/directus/getStorageDirectUrl.js";
    import makeAuthorsNameString from "$lib/directus/makeAuthorsNameString.js";
    import { queryParam } from "sveltekit-search-params";
    import { page } from "$app/stores";

    const search = queryParam("search", { debounceHistory: 5000 });
    export let data;
</script>

<PageHeader title="News" subtitle="Keep up with our events and happenings." />

<div class="ct">
    <!-- daisyui text input -->
    <label class="input input-bordered flex items-center gap-2 mb-4">
        <!-- note that we get the value from searchParams rather than $search to prevent the value from changing as the page is navigating (leads to rubberbanding in the search bar) -->
        <input
            class="grow"
            placeholder="Search"
            value={$page.url.searchParams.get("search")}
            autocomplete="off"
            type="search"
            spellcheck="true"
            on:input={(e) => search.set(e.target.value)}
        />
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="h-4 w-4 opacity-70"
        >
            <path
                fill-rule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clip-rule="evenodd"
            />
        </svg>
    </label>

    <div class="flex flex-col gap-8">
        {#each data.items as item}
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
</div>
