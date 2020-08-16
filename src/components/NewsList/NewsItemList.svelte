<script>
  import { fade } from "svelte/transition"
  import NewsItem from "./NewsItem.svelte"

  export let items
</script>

<ul class="items">
  {#each items as item, i}
    <li in:fade={{ duration: 100, delay: 10 * i }}>
      <NewsItem {item} num={i + 1} />
    </li>
  {/each}
</ul>
