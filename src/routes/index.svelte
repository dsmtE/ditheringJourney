<script lang="ts">

  import Tag from "$lib/components/Tag.svelte";

  import { onMount } from 'svelte';
  import { base } from '$app/paths';

  export async function load({ fetch }) {
    const posts = await fetch(`${base}/index.json`)
        .then((r) => r.json());
    return {
      props: { posts }
    }
  }
  
	onMount(async () => {
    const postsFiles = import.meta.glob('../routes/articles/*.svx');
    const postsPromises = [];
    for (const path in postsFiles)
    postsPromises.push(postsFiles[path]().then(({metadata}) => metadata));
    
    posts = await Promise.all(postsPromises);
	});
  
  let posts = [];

</script>

<div>
  <ul class="flex flex-col my-20">
    {#each posts as {title, tags, description, slug}}
    <li class="list-none mb-4">
      <a class=" space-y-3 text-2xl" rel="prefetch" href="{base}/articles/{slug}"> {title} </a>
        <p class="text-sm"> {description} </p>
        {#if tags.length > 0}
          <p class="text-sm font-normal text-gray-500">
            Tags: {#each tags as tag} <Tag {tag} /> {/each}
          </p>
        {/if}
    </li>
    {/each}
  </ul>

</div>
