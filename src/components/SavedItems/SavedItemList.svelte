<script>
  import SavedItem from "./SavedItem.svelte"

  export let items
</script>

<ul class="items">
  {#each items as item, i}
    <li>
      <SavedItem {item} />
    </li>
  {/each}
</ul>
