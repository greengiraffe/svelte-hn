<script>
  import { onMount } from "svelte"

  import API from "../api"
  import NewsItem from "../components/NewsItem.svelte"

  // svelte-routing
  export let location

  let items

  onMount(async () => {
    items = await API.news()
  })
</script>

<style>

</style>

{#if items}
  <ul class="items">
    {#each items as item, i}
      <li>
        <NewsItem {item} num={i + 1} />
      </li>
    {/each}
  </ul>
{:else}
  <p>Loading...</p>
{/if}
