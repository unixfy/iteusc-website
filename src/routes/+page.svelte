<script>
    import Jumbotron from "$lib/Jumbotron.svelte";
</script>

<!-- Page jumbotron -->
<Jumbotron/>

<!-- What is USC ITE? -->
<div class="section bg-ite-blue text-white">
    <div class="ct flex flex-col space-y-4 text-xl">
        <h1 class="section-subheading font-bold">▶ We're shaping the future of transportation, supply chain, and
            technology.</h1>
        <p>ITE at USC is a student chapter of the global Institute of Transportation Engineers.</p>
        <p>We host site tours, speaker series, career, events, professional projects, and more. We help students broaden
            their view of and interest
            in the transportation field. We provide outstanding networking opportunities and bring awareness to the
            transportation industry. We aren't just for transportation engineers - we're really the <span
                    class="font-bold">Institute of Transportation Enthusiasts</span>.
        </p>
        <p class="font-bold">Most of all, we're changing the world of transportation, one student at a time.</p>
    </div>
</div>

<!-- Photos of ITE events -->
<div class="">
    <div class="grid md:grid-rows-2 md:grid-cols-3">
        <div class="bg-[url('/images/atsac.jpg')] homepage-grid-image">
            <div class="homepage-grid-text">
                <p>LA Department of Transportation site tour</p>
            </div>
        </div>
        <div class="bg-[url('/images/esri-redlands.jpg')] homepage-grid-image">
            <div class="homepage-grid-text">
                <p class="text-white font-bold text-lg">Esri headquarters site tour</p>
            </div>
        </div>
        <div class="bg-[url('/images/roberts-speaker-series.jpg')] homepage-grid-image">
            <div class="homepage-grid-text">
                <p class="text-white font-bold text-lg">Speaker series with Caltrans District 7 director</p>
            </div>
        </div>
        <div class="bg-[url('/images/sls23.jpg')] homepage-grid-image">
            <div class="homepage-grid-text">
                <p class="text-white font-bold text-lg">2023 ITE Student Leadership Summit conference</p>
            </div>
        </div>
        <div class="bg-[url('/images/sls23-volunteers.jpg')] homepage-grid-image">
            <div class="homepage-grid-text">
                <p class="text-white font-bold text-lg">2023 ITE Student Leadership Summit conference</p>
            </div>
        </div>
        <div class="bg-[url('/images/trapac.jpg')] homepage-grid-image">
            <div class="homepage-grid-text">
                <p class="text-white font-bold text-lg">Port of Los Angeles site tour</p>
            </div>
        </div>
    </div>
</div>

<!-- Project listing -->
<div class="section bg-usc-red text-white">
    <div class="ct">
        <h1 class="section-heading">Projects</h1>
        <h2 class="section-subheading">Take a look at what we're working on.</h2>
        <div class="mt-8 flex flex-col space-y-8">
            {#each Array(3) as x }
                <!--            Tailwind card with title, subtitle, and image -->
                <div class="bg-white rounded-md hover:drop-shadow-lg transition-all">
                    <div class="flex flex-col md:flex-row h-full">
                        <div class="w-full md:w-1/3 rounded-l-md bg-[url('/images/s-bahn.jpg')] bg-cover md:aspect-video">
                        </div>
                        <div class="w-full md:w-2/3 p-4 text-black space-y-4 h-full">
                            <h3 class="text-xl font-bold">Los Angeles Department of Transportation site tour</h3>
                            <p class="text-gray-600">We hosted a site tour of the Los Angeles Department of
                                Transportation
                                (LADOT) headquarters in downtown Los Angeles. We learned about the history of LADOT, the
                                current projects they're working on, and the future of transportation in Los
                                Angeles.</p>
                        </div>
                    </div>
                </div>
            {/each}
            <!--    Button that links to a page listing all projects -->
            <a class="btn btn-block btn-primary btn-lg" href="/projects/">View all projects</a>

        </div>
    </div>
</div>

<!-- Events schedule -->
<div class="section">
    <div class="ct">
        <h1 class="section-heading">Events</h1>
        <h2 class="section-subheading">Check out what's going on.</h2>
        <!--    Google Calendar embed -->
        <iframe class="w-full min-h-[500px] md:aspect-video"
                src="https://calendar.google.com/calendar/u/0/embed?src=iteusc@gmail.com&ctz=America/Los_Angeles"
                title="Google Calendar embed showing ITE USC events"></iframe>

        <a class="btn btn-block btn-primary btn-lg mt-8" href="/calendar/">Full calendar</a>
    </div>
</div>

<!-- Join us Call to Action -->
<div class="bg-[url('/images/k-line.png')] bg-cover bg-center">
    <!--    Really janky way to get a black overlay over the background image -->
    <div class="w-full h-full py-[10vh] bg-black bg-opacity-30">
        <div class="flex flex-col md:flex-row ct">
            <div class="text-white text-center md:text-left pb-8 md:pb-0">
                <h1 class="my-auto text-3xl md:text-4xl font-bold text-white pb-4">What are you waiting
                    for? Join USC ITE now!</h1>
                <p class="text-2xl">Free polo + great experiences included.</p>
            </div>
            <a class="btn glass md:ml-auto my-auto btn-lg" href="/join/">Join us now</a>
        </div>
    </div>
</div>

