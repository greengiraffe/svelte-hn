<script>
  import BookmarkedItem from "./BookmarkedItem.svelte"

  export let items
</script>

<ul class="items">
  {#each items as item, i}
    <li>
      <BookmarkedItem {item} />
    </li>
  {/each}
</ul>
