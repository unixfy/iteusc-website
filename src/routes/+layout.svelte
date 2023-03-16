<script>
    import "../app.css";
    import Navbar from "$lib/Navbar.svelte";
    import Footer from "$lib/Footer.svelte";
</script>

<Navbar/>

<div class="min-h-screen">
    <slot/>
</div>

<Footer/>