<script>
    export let data;
</script>

<div class="bg-[url('/images/a-line.jpg')] bg-cover bg-center h-[50vh]">
    <div
        class="bg-black bg-opacity-50 h-full w-full text-white flex flex-col place-content-center text-center"
    >
        <h1 class="section-heading">Join USC ITE 👋</h1>
        <h2 class="section-subheading">
            Free polo + great experiences included. Open to all USC students!
        </h2>
    </div>
</div>

<!--Show steps for joining using DaisyUI components-->
<div class="ct text-center flex flex-col space-y-8 py-8">
    <h2 class="section-heading">It's so easy to join</h2>
    <ul class="steps w-full">
        <li class="step step-primary">
            <p>Join our mailing list</p>
        </li>
        <li class="step">We'll reach out with more info</li>
        <li class="step">Success!</li>
    </ul>

    <!--    Google Form iframe -->
    {#if data.config.join_form_url}
        <iframe
            class="min-h-[100vh]"
            src={data.config.join_form_url}
            title="Google Form to subscribe to ITE newsletter"
        ></iframe>
    {:else}
        <p>No form URL defined in API!</p>
    {/if}
</div>
