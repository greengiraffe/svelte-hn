<script>
  import NewsItem from "../NewsList/NewsItem.svelte"

  export let items
</script>

<ul class="items">
  {#each items as item, i}
    <li>
      <NewsItem {item} num={i + 1} />
    </li>
  {/each}
</ul>
