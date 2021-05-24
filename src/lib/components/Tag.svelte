<script lang="ts">

type TagInfos = {
  name: string;
  link: string;
};

  export let tag: TagInfos;
</script>

<a href="{tag.link}" target="_blank" class="hover:no-underline">
  <span class="tagWrapper inline-flex items-center px-3 py-0.5 rounded-full text-sm leading-5 border m-1">
    { tag.name }
  </span>
</a>


<style>

  .tagWrapper {

    color: var(--accent-color);
    background-color: white;

    &:hover {
      color : white;
      background-color: var(--accent-color);
    }
  }
</style>