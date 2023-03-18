<script>
    import PageHeader from "$lib/PageHeader.svelte";
</script>

<PageHeader title="Our Projects" subtitle="How we're impacting the world of transportation."></PageHeader>
<div class="ct">
    <div class="grid md:grid-cols-2 lg:grid-cols-3 mb-8">
        {#each Array(12) as arr}
            <label for="project-modal">
                <div class="card card-compact bg-base-100 border hover:shadow-xl my-4 mx-8 hover:scale-[1.05] transition-all hover:bg-gray-100 hover:cursor-pointer">
                    <figure><img src="/images/s-bahn.jpg" alt="Project title"/></figure>
                    <div class="card-body">
                        <h2 class="card-title">Cool project!</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vulputate nunc at arcu finibus
                            mattis. Aenean posuere placerat elit, ut viverra turpis interdum nec. Nunc consequat orci ut
                            ornare rhoncus. Nullam eu lobortis dui, at dignissim enim. In id cursus nisl, eu euismod
                            augue. Quisque lacinia aliquam lacus. Praesent interdum enim sit amet porttitor dignissim.
                            Donec accumsan ex sit amet sapien ullamcorper dignissim. Phasellus venenatis pretium justo
                            ut feugiat.

                        </p>
                    </div>
                </div>
            </label>

            <input type="checkbox" id="project-modal" class="modal-toggle"/>
            <label for="project-modal" class="modal cursor-pointer">
                <div class="modal-box relative">
                    <label for="project-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 class="text-lg font-bold">Cool project!</h3>
                    <p class="py-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vulputate nunc at
                        arcu finibus mattis. Aenean posuere placerat elit, ut viverra turpis interdum nec. Nunc
                        consequat orci ut ornare rhoncus. Nullam eu lobortis dui, at dignissim enim. In id cursus nisl,
                        eu euismod augue. Quisque lacinia aliquam lacus. Praesent interdum enim sit amet porttitor
                        dignissim. Donec accumsan ex sit amet sapien ullamcorper dignissim. Phasellus venenatis pretium
                        justo ut feugiat.

                    </p>
                </div>
            </label>
        {/each}
    </div>
</div>