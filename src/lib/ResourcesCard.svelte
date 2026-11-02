<script>
    export let name;
    export let description;
    export let url;
</script>

<a href={url} target="_blank" rel="noreferrer">
    <div class="card bg-base-200 hover:scale-105 transition-all drop-shadow-lg">
        <div class="card-body">
            <h2 class="card-title font-display">{name}</h2>

            {#if description}
                <div>
                    <p class="break-words">{description}</p>
                </div>
            {/if}
        </div>
    </div>
</a>
