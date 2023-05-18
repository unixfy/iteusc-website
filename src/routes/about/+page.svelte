<script>
    import PageHeader from "$lib/PageHeader.svelte";
    import TeamMemberCard from "$lib/TeamMemberCard.svelte";
    import {getStorageDirectUrl} from "$lib/firebase/getStorageDirectUrl.js";

    export let data;
    // Define team members
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

        <div class="grid md:grid-cols-3">
            <!--            Display a card for each team member -->
            {#each data.members as member}
                <TeamMemberCard name="{member.name}" role="{member.role}" image="{getStorageDirectUrl(member.image)}"
                                major="{member.major}" hometown="{member.hometown}"/>
            {/each}
        </div>
    </div>
</div>

