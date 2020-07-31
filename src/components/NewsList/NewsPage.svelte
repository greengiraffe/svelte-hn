<script>
  import { onMount, beforeUpdate, afterUpdate, tick } from "svelte"
  import { showSidebar } from "../../store"

  import API from "../../api"
  import { validStoryType } from "../../api/storyTypes"
  import NewsItem from "./NewsItem.svelte"
  import LoadingOverlay from "../LoadingOverlay.svelte"

  export let location // passed by svelte-routing
  export let storyType // passed by svelte-routing

  let items
  let showLoading = false

  afterUpdate(async () => {
    // TODO figure out best way to load different story types
    // Probably using a wrapping component that handles the fetching
    // console.log("update")
    // if (validStoryType(storyType)) {
    //   showLoading = true
    //   await tick()
    //   items = await API.news()
    // }
  })

  onMount(async () => {
    console.log(location, storyType)
    showSidebar.set(false)
    items = await API.news()
  })
</script>

<style>

</style>

{#if items && !showLoading}
  <ul class="items">
    {#each items as item, i}
      <li>
        <NewsItem {item} num={i + 1} />
      </li>
    {/each}
  </ul>
{:else}
  <LoadingOverlay />
{/if}
