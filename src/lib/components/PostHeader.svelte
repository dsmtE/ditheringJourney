<script lang="ts">
  import Tag from "$lib/components/Tag.svelte";
  export let title: string;
  export let published_at: string;
  export let tags;
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<div class="font-sans mb-10">
  <h1 class="font-sans pt-6 pb-2 text-3xl md:text-4xl" >
    {title}
  </h1>
  {#if published_at != undefined && published_at.length > 0}
  <p class="text-sm md:text-base font-normal text-gray-500">
    Published { published_at }
  </p>
  {/if}
  {#if tags != undefined && tags.length > 0}
    <p class="text-sm font-normal text-gray-500">
      Tags: {#each tags as tag} <Tag {tag} /> {/each}
    </p>
  {/if}
</div>