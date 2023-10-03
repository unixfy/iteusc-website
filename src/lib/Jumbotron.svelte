<script>
    import Typed from "typed.js";

    import {onMount, onDestroy} from "svelte";

    let typedJsObject;
    // on mount, init typed.js on an element with class 'typed'
    onMount(() => {
        typedJsObject = new Typed('.typed', {
            // define the strings that typedjs will loop through
            strings: ['transportation engineers.', 'transportation planners.', 'transportation enthusiasts.', 'transportation\'s future.'],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 1200,
            loop: true
        })
    })

    // don't forget to destroy typedJS object once the page is destroyed
    onDestroy(() => {
        if (typedJsObject) {
            typedJsObject.destroy();
        }
    })
</script>


<div class="hero min-h-[50vh] bg-[url('/images/jumbotron.jpg')] text-white bg-cover bg-center">
    <div class="bg-black w-full h-full flex flex-col bg-opacity-50">
        <div class="hero-content m-auto flex-col text-center w-full">
            <h1 class="text-2xl md:text-3xl lg:text-4xl font-display">USC Institute of Transportation Engineers</h1>
            <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold font-display">We are <span class="typed"></span></h1>
            <div class="max-w-md">
                <p class="pt-8">⬇ Scroll down to learn more</p>
            </div>
        </div>
    </div>
</div>