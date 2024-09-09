<script>
    import { format, parseISO } from "date-fns";
    import { getStorageDirectUrl } from "$lib/directus/getStorageDirectUrl.js";
    import makeAuthorsNameString from "$lib/directus/makeAuthorsNameString.js";
    import { generateHTML } from "@tiptap/html";
    import StarterKit from "@tiptap/starter-kit";
    import Video from "$lib/blocks/Video.svelte";
    import ImageGalleryImage from "$lib/blocks/ImageGalleryImage.svelte";
    import { Image } from "@unpic/svelte";

    export let data;
</script>

<div class="bg-usc-cardinal text-white py-6">
    <div class="narrow-ct">
        <div class="breadcrumbs mb-4 overflow-hidden font-display">
            <ul>
                <li><a href="/">USC ITE</a></li>
                <li><a href="/news">News</a></li>
                <li>{data.page.title}</li>
            </ul>
        </div>

        <div>
            <h1 class="section-heading">{data.page.title}</h1>
            <p class="section-subheading">
                Posted {format(parseISO(data.page.date_posted), "LLLL d, y")} by
                <!-- generates a list of names of all authors, including "and" for the last author -->
                {makeAuthorsNameString(data.page.people)}
            </p>
        </div>
    </div>
</div>

<div class="narrow-ct">
    {#if data.page.image}
        <Image
            src="{getStorageDirectUrl(data.page.image)}?format=webp"
            class="page-img"
            alt="Image for {data.page.title}"
            width={1920}
            aspectRatio="16/9"
            cdn="directus"
            priority=true
        />
        <div class="my-4 border border-base-300"></div>
    {/if}

    <!-- Call Tiptap generateHTML if the block builder was used on this page; otherwise just render the page content as html (legacy page handling) -->
    <!-- Note that we use a janky manual generation method if a Svelte block is present (calling generateHTML for everything makes it very hard to render Svelte components correctly) -->
    {#if data.page.content_blocks}
        {#each data.page.content_blocks.content as content}
            {#if content.type === "relation-block"}
                <!-- Image gallery blocks -->
                {#if content.attrs.collection === "BLOCK_image_gallery"}
                    <div class="image-gallery-blocks-grid">
                        {#each content.attrs.data.gallery_images as image_item}
                            <!-- Wrapper div ensures images are vertically centered in the grid -->
                            <div class="my-auto">
                                <ImageGalleryImage
                                    image="{getStorageDirectUrl(
                                        image_item.image,
                                    )}?format=webp"
                                    caption={image_item.image_caption}
                                ></ImageGalleryImage>
                            </div>
                        {/each}
                    </div>
                {/if}

                <!-- Video blocks -->
                {#if content.attrs.collection === "BLOCK_video"}
                    <Video
                        video={getStorageDirectUrl(content.attrs.data.video.id)}
                    ></Video>
                {/if}
            {:else}
                <div class="directus-html">
                    {@html generateHTML({ type: "doc", content: [content] }, [
                        StarterKit,
                    ])}
                </div>
            {/if}
        {/each}
    {:else}
        <div class="directus-html">
            {@html data.page.content}
        </div>
    {/if}
</div>

<div class="narrow-ct p-8 bg-base-300 rounded-xl">
    <!-- display "authors" plural if there are more than 1 authors -->
    <h2 class="section-subheading">
        About the author{#if data.page.people.length > 1}s{/if}
    </h2>
    <div class="flex flex-col gap-4">
        {#each data.page.people as person}
        
            <p class="p-readable">
                {#if person.people_id.bio}
                {person.people_id.bio}
                {:else}
                No information provided.
                {/if}
            </p>

        {/each}
    </div>
</div>
