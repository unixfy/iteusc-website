<script>
    import PageHeader from "#lib/PageHeader.svelte";
    import TeamMemberCard from "#lib/TeamMemberCard.svelte";
    import { getStorageDirectUrl } from "#lib/directus/getStorageDirectUrl.js";
    import { setAttr } from "#lib/directus/visualEditor.js";

    export let data;
</script>

<PageHeader
    title="About USC ITE"
    subtitle="Learn more about who we are and what we do."
></PageHeader>
<div class="ct">
    <!--    Mission statement box -->
    <div class="bg-ite-blue p-4 md:p-8 flex flex-col text-center text-white">
        <h2 class="text-2xl md:text-3xl mt-auto pb-4">Our mission statement</h2>
        <p             data-directus={setAttr({
                collection: "site_config",
                item: "797fe000-9c1f-4ed1-afaf-1c6610ed1941",
                fields: "mission_statement",
                mode: "popover",
            })}>
            {data.missionStatement}
        </p>
    </div>
    <!--   Highlighted awards album section -->
    {#if data.highlightedAlbum?.image}
        <a
            class="group mt-4 flex min-h-24 md:min-h-32 overflow-hidden bg-base-200"
            href={data.highlightedAlbum.url}
            target="_blank"
            rel="noreferrer"
            data-directus={setAttr({
                collection: "site_config",
                item: "797fe000-9c1f-4ed1-afaf-1c6610ed1941",
                fields: "about_highlighted_photo_album",
                mode: "popover",
            })}
        >
            <div class="relative w-2/5 md:w-48 shrink-0">
                <img
                    src="{getStorageDirectUrl(
                        data.highlightedAlbum.image,
                    )}?format=webp&width=640&quality=70"
                    alt=""
                    class="absolute inset-0 h-full w-full object-cover object-center"
                    loading="lazy"
                />
            </div>
            <div class="flex flex-1 min-w-0 flex-col justify-center gap-2 px-4 py-4 md:flex-row md:items-center md:justify-between md:gap-8 md:px-8">
                <div class="min-w-0">
                    <h2 class="font-display font-bold text-xl md:text-3xl mb-1">
                        Our awards
                    </h2>
                    <p class="text-sm md:text-base text-base-content/80">
                        Our chapter has consistently been recognized for our excellence. Learn more here.
                    </p>
                </div>
                <p class="md:shrink-0 text-sm md:text-base underline decoration-usc-cardinal underline-offset-4 group-hover:text-usc-cardinal">
                    {data.highlightedAlbum.name.trim()}
                </p>
            </div>
        </a>
    {/if}

    <!--   Current team section -->
    <div class="section"             data-directus={setAttr({
                collection: "site_config",
                item: "797fe000-9c1f-4ed1-afaf-1c6610ed1941",
                fields: "current_leadership_team",
                mode: "popover",
            })}>
        <h2 class="section-heading text-center">
            Meet our {data.currentLeadershipTeamYearString} leadership team
        </h2>

        <div class="grid md:grid-cols-3 lg:grid-cols-4">
            <!--            Display a card for each team member -->
            {#each data.currentLeadershipTeam.people as teamMember}
            <div             data-directus={setAttr({
                collection: "people",
                item: teamMember.people_id.id,
                fields: "",
                mode: "modal",
            })}>

                <TeamMemberCard
                    name="{teamMember.people_id.first_name} {teamMember
                        .people_id.last_name}"
                    role={teamMember.position}
                    image="{getStorageDirectUrl(
                        teamMember.people_id.picture,
                    )}?width=400&format=webp"
                    major={teamMember.people_id.degrees
                        .map((degree) => degree.degrees_id.name)
                        .join(", ")}
                />
            </div>
            {/each}
        </div>
    </div>

    <!-- Past leadership teams section  -->
    <div class="section">
        <div class="narrow-ct">
            <h2 class="section-heading text-center">Past leadership teams</h2>

            <div class="flex flex-col gap-2 w-full">
                {#each data.otherLeadershipTeams as team}
                    <a
                        class="btn btn-block btn-lg"
                        href="/about/leadership-team/{team.id}"
                        >{team.start_year} Leadership Team</a
                    >
                {/each}
            </div>
        </div>
    </div>
</div>
