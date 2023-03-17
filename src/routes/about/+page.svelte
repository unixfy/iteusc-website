<script>
    import PageHeader from "$lib/PageHeader.svelte";

    let teamMembers = [
        {
            "name": "Alex Wang",
            "image": ""
        }
    ]
</script>

<PageHeader title="About USC ITE" subtitle="Learn more about who we are and what we do."></PageHeader>
<div class="ct">

    <div class="bg-blue-100 p-4 md:p-8 flex flex-col text-center rounded-md">
        <h1 class="text-2xl md:text-3xl mt-auto pb-4">
            Our mission statement
        </h1>
        <p>
            The mission of the USC Institute of Transportation Engineers chapter is to promote the development of
            innovative and sustainable transportation solutions that meet the needs of the community. We aim to foster
            discussion and collaboration among students, faculty, and professionals in the transportation industry to
            advance the field of transportation engineering and planning. Our chapter is committed to exploring and
            addressing the most pressing transportation issues of our time, including smart systems, micromobility, and
            equity in transportation access. We strive to create a welcoming and inclusive environment that encourages
            diversity of thought and promotes the exchange of ideas.
        </p>
    </div>
    <div class="section">
        <h1 class="section-heading">Meet our team</h1>

        {#each teamMembers as teamMember}
            <div>
            </div>
        {/each}
    </div>
</div>

