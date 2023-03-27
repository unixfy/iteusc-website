<script>
    import {onMount} from "svelte";
    import {signOut} from "$lib/firebase/auth.js";

    onMount(() => {
        signOut();
    })
</script>