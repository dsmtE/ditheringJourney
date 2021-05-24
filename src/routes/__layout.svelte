<script lang="ts">
    import '../app.postcss';
    import Side from '$lib/Side.svelte';
    import GithubCorner from '$lib/components/GithubCorner.svelte';	
    import SpinnerCircle from '$lib/components/SpinnerCircle.svelte';
    import { Svrollbar } from 'svrollbar';
    import { onMount } from 'svelte';
    
    let viewport: Element;
    let contents: Element;
    
    let loaded = false;
    
    onMount(async () => {
        loaded = true;
    });
</script>

{#if ! loaded }
    <div class="min-h-screen flex content-center items-center justify-center">
        <div id="loader">
            <p>LOADING</p>
            <SpinnerCircle size={80} duration={1} />
        </div>
    </div>
{:else}
    <div class="w-full flex flex-grow">
        <div class="p-3 flex-none hidden lg:block w-1/5 sticky top-0 items-start h-screen">
            <Side />
        </div>
        <div bind:this={viewport} class="viewport flex-grow flex align-top justify-center">
            <div class="max-w-screen-lg flex-grow">
                <div bind:this={contents} class="px-4 relative">
                    <slot />
                </div>
                <Svrollbar {viewport} {contents} />
            </div>
        </div>
    </div>
    <GithubCorner link='https://github.com/dsmtE/ditheringJourney'/>
{/if}

<style lang="postcss">
    .viewport {
        /* svrollbar settings */
        --svrollbar-track-width: 30px;
        --svrollbar-thumb-width: 8px;
        --svrollbar-thumb-opacity: 0.7;
        
        @apply h-screen overflow-y-scroll;
        /* hide scrollbar */
        -ms-overflow-style: none;
        scrollbar-width: none;
        
        &::-webkit-scrollbar {
            /* hide scrollbar */
            display: none;
        }
    }
</style>