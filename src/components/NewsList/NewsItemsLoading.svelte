<script>
  import { fade } from "svelte/transition"
  import NewsItemSkeleton from "./NewsItemSkeleton.svelte"

  export let itemCount = 30
</script>

<style>
  .wrapper {
    position: absolute;
    z-index: 2;
    top: 3em; /* TitleBar height */
    right: 0;
    bottom: 0;
    left: 0;
  }
</style>

<div class="wrapper" in:fade={{ duration: 50 }}>
  {#each Array(itemCount) as _, index}
    <NewsItemSkeleton {index} />
  {/each}
</div>
