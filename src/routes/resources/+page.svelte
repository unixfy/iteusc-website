<script>
  import PageHeader from "$lib/PageHeader.svelte";
  import ResourcesCard from "$lib/ResourcesCard.svelte";
  export let data;
</script>

<PageHeader
  title="Resources"
  subtitle="Useful links and references from the transportation world."
/>

<div class="ct">
  {#each data.resources_tags as tag}
    <div class="my-8">
      <h2 class="section-heading">{tag.name}</h2>
      <div class="flex flex-col gap-4">
        {#each tag.related_resources as resource}
          <ResourcesCard
            name={resource.resources_id.name}
            description={resource.resources_id.description}
            url={resource.resources_id.url}
          />
        {/each}
      </div>
    </div>
  {/each}
</div>
