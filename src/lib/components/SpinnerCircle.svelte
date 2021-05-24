<script lang="ts">
  export let size = 60;
  export let unit = "px";
  export let duration = 0.75;
</script>
<style lang="postcss">
  .circle {
    margin: 0;
    height: var(--size);
    width: var(--size);
    border-color: transparent var(--accent-color) var(--accent-color) var(--accent-color);
    border-width: calc(var(--size) / 15);
    border-style: solid;
    border-image: initial;
    border-radius: 50%;
    animation: var(--duration) linear 0s infinite normal none running rotate;
  }
  @keyframes rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>

<div class="circle" style="--size: {size}{unit}; --duration: {duration}s"></div>
