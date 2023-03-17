<script>
    import "../app.css";
    import Navbar from "$lib/Navbar.svelte";
    import Footer from "$lib/Footer.svelte";
    import {onMount} from "svelte";
    import {initializeApp} from "firebase/app";

    onMount(() => {
        // this firebase config comes from the firebase console
        const firebaseConfig = {
            apiKey: "AIzaSyCPPaxyqvEpYaeyhOlUZ0W9dmfROW4trpc",
            authDomain: "la-ite-micromobility.firebaseapp.com",
            databaseURL: "https://la-ite-micromobility.firebaseio.com",
            projectId: "la-ite-micromobility",
            storageBucket: "la-ite-micromobility.appspot.com",
            messagingSenderId: "700577241231",
            appId: "1:700577241231:web:dd3e750779407e050df8fa",
            measurementId: "G-PPZH80P5TQ"
        };

        // initialize firebase (needed to do anything w firebase)
        const app = initializeApp(firebaseConfig);
    })
</script>

<Navbar/>

<div class="min-h-screen">
    <slot/>
</div>

<Footer/>