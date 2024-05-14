<script>
    import { Image } from "@unpic/svelte";

    export let image;
    // Hall of Fame person's name
    export let name;
    // Hall of fame person's bio
    export let bio;
    // Hall of fame person's degrees
    export let degrees;
    // Person's LinkedIn url
    export let linkedin;
    // Person's former role
    export let role;
    // Person's start of participation
    export let participation_start;
    // Person's end of participation
    export let participation_end;
</script>

<div class="flex flex-col sm:flex-row gap-8">
    <Image
        src={image}
        alt="Headshot for {name}"
        class="rounded-lg shadow-md mx-auto"
        background="auto"
        cdn="directus"
        width="192"
        height="192"
    />

    <div class="bg-base-100 p-0">
        <h2
            class="text-center sm:text-left text-2xl sm:text-3xl font-bold font-display pb-4"
        >
            {name}
            <span class="font-normal"
                >({role}, {participation_start} - {participation_end})</span
            >
        </h2>

        <p class="pb-2 font-light">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="inline"
                viewBox="0 0 16 16"
            >
                <path
                    d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917l-7.5-3.5Z"
                />
                <path
                    d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466 4.176 9.032Z"
                />
            </svg>
            Degrees earned: {degrees}
        </p>

        <p class="directus-html">{@html bio}</p>

        <a
            href={linkedin}
            class="btn btn-primary btn-sm"
            target="_blank"
            rel="noreferrer">View on LinkedIn</a
        >
    </div>
</div>
