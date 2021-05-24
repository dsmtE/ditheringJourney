<script lang="ts">

  import { onMount } from 'svelte';
  
	onMount(async () => {
    const postsFiles = import.meta.glob('../routes/articles/*.svx');
    const postsPromises = [];
    for (const path in postsFiles)
    postsPromises.push(postsFiles[path]().then(({metadata}) => metadata));
    
    posts = await Promise.all(postsPromises);
	});
  
  let posts = [];

  const logos = [
    { name: "svelteKit", url: "https://kit.svelte.dev/" },
    { name: "svelte", url: "https://svelte.dev/" },
    { name: "typescript", url: "https://www.typescriptlang.org/" },
    { name: "tailwindcss", url: "https://tailwindcss.com/" },
    { name: "markdown", url: "https://fr.wikipedia.org/wiki/Markdown" },
    { name: "mdsvex", url: "https://mdsvex.com/" },
  
  ];

</script>

<div class="flex flex-col h-full px-4 grayBr">
  <div class="grayBb h-50 py-10 text-center">
    <a href="/" class="title">Dithering Journey</a>
    <p class=" mt-6"> small blog posts about dithering and image made for a personal project at IMAC engineering school</p>
  </div>
  <div class="flex-grow">
    <h1 class="my-4 underline text-center montserrat text-lg">Articles</h1>
    <div class="container pl-5">
      <ul class="flex justify-between flex-col list-outside list-disc text-left">
        {#each posts as {title, description, slug}}
          <li class=" my-4">
            <a class="underline space-y-3" rel="prefetch" href="/articles/{slug}"> {title}</a>
            <p class="text-xs overflow-hidden whitespace-nowrap overflow-ellipsis "> {description} </p>
          </li>
        {/each}
      </ul>
    </div>
  </div> 
  <div class="grayBt text-center">
    <p class=" my-2"> Made using </p>
    <div class="flex flex-wrap justify-center">
      {#each logos as {name, url}}
        <a class="flex justify-center" href={url} target="_blank" title={name}> <img class="m-1 h-5" alt={name} src={"/brands/"+ name + ".svg"} /> </a>
      {/each}
    </div>
  </div>
</div>

<style>
  
  .title {
    position: relative;
  
    @apply text-2xl tracking-widest no-underline;

    font-family: 'Montserrat', Arial, sans-serif;
    color: black;

    &:hover, &:focus, &:active {
      &:after {
        width: 100%;
      }
    }

    &:after {
      content: '';
      position: absolute;
      @apply left-0 right-0 mx-auto;

      bottom: -0.3em;

      @extend grayBt;

      transition: width .25s;
      width: 60%;
    }
  }

  .container {
    position: relative;
     /* svrollbar settings */
    --svrollbar-track-width: 12px;
    --svrollbar-thumb-width: 10px;
    --svrollbar-thumb-background: var(--accent-color);
    --svrollbar-thumb-opacity: 1;
    --svrollbar-thumb-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);

    @apply overflow-y-scroll;
        /* hide scrollbar */
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      /* hide scrollbar */
      display: none;
    }

  }
  .fab {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background-color: var(--accent-color);
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0.5rem;
    right: 0.5rem;
    margin: 0;
    color: white;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  }
  .item {
    font-size: 0.8rem;
    padding: 0.25rem 0.5rem;
  }

</style>

