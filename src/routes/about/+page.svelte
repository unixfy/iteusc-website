<script>
    import PageHeader from "$lib/PageHeader.svelte";

    // each team member gets a name (obviously), position (obviously),  image (which is the name of their headshot picture within static/team
    // major, and hometown
    // keep in mind that in javascript, arrays are ordered!
    let teamMembers = [
        {
            "name": "James Huang",
            "position": "President",
            "image": "james-huang.jpg",
            "major": "BS Industrial and Systems Engineering",
            "hometown": "New York, NY"
        },
        {
            "name": "Ryan Zapata",
            "position": "Vice President",
            "image": "ryan-zapata.jpg",
            "major": "BS Urban Studies and Planning",
            "hometown": "Glendale, CA"
        },
        {
            "name": "David Martinez",
            "position": "Vice President",
            "image": "david-martinez.jpg",
            "major": "BS Public Policy",
            "hometown": "Long Beach, CA"
        },
        {
            "name": "Tim Labounko",
            "position": "Project Coordinator",
            "image": "tim-labounko.jpg",
            "major": "BS Urban Studies and Planning",
            "hometown": "Boston, MA"
        },
        {
            "name": "Alex Wang",
            "position": "Social Media",
            "image": "alex-wang.jpg",
            "major": "BS Industrial and Systems Engineering",
            "hometown": "Detroit, MI"
        },
        {
            "name": "Christine Stavish",
            "position": "Senior Advisor",
            "image": "christine-stavish.jpg",
            "major": "BS Civil Engineering",
            "hometown": "Philadelphia, PA"
        }

    ]
</script>

<PageHeader title="About USC ITE" subtitle="Learn more about who we are and what we do."></PageHeader>
<div class="ct">

    <!--    Mission statement box -->
    <div class="bg-ite-blue p-4 md:p-8 flex flex-col text-center text-white">
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
    <!--    Team section -->
    <div class="section">
        <h1 class="section-heading text-center">Meet our team</h1>

        <div class="flex grid md:grid-cols-3">
            {#each teamMembers as teamMember}
                <div class="card bg-base-100 border border-base-content max-w-[16rem] justify-self-center m-4 hover:md:scale-[1.05] transition-all">
                    <figure><img src="/team/{teamMember.image}" class="aspect-square object-cover"
                                 alt="Shoes"/>
                    </figure>
                    <div class="card-body p-4">
                        <div>
                            <h2 class="card-title">{teamMember.name}</h2>
                            <p class="italic font-light">{teamMember.position}</p>
                        </div>
                        <div>
                            <p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     class="bi bi-book inline" viewBox="0 0 16 16">
                                    <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
                                </svg>
                                {teamMember.major}
                            </p>
                            <p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     class="bi bi-geo-alt inline" viewBox="0 0 16 16">
                                    <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/>
                                    <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                </svg>
                                {teamMember.hometown}</p>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>

