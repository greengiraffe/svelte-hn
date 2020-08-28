<script>
  import { fade } from "svelte/transition"
  import NewsItem from "./NewsItem.svelte"
  import NewsItemSkeleton from "./NewsItemSkeleton.svelte"

  export let items
  export let delayTransition = true
  export let showTransition = true
</script>

<ul class="items">
  {#each items as item, i}
    <li
      in:fade={{ duration: showTransition ? 200 : 0, delay: showTransition && delayTransition ? 10 * i : 0 }}
    >
      {#if item}
        <NewsItem {item} rank={i + 1} />
      {:else}
        <NewsItemSkeleton />
      {/if}
    </li>
  {/each}
</ul>
