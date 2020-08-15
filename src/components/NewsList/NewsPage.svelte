<script>
  import { afterUpdate, onDestroy } from "svelte"
  import { fade } from "svelte/transition"
  import { get } from "svelte/store"
  import { navigate } from "svelte-routing"
  import { showSidebar, currentStoryType } from "../../store"
  import API from "../../api"
  import NewsItem from "./NewsItem.svelte"
  import NewsItemsLoading from "./NewsItemsLoading.svelte"
  import { InvalidStoryTypeError } from "../../api/errors"

  export let storyType // passed by svelte-routing

  let items = []
  let isLoading = false
  let showLoadingIndicator = false

  const LOADING_INDICATOR_DELAY = 200 // ms

  $: {
    if (storyType !== $currentStoryType) {
      isLoading = true

      // show loading indicator if the content is still
      // loading after 200 ms
      setTimeout(() => {
        if (isLoading) {
          showLoadingIndicator = true
        }
      }, LOADING_INDICATOR_DELAY)

      // update store
      currentStoryType.set(storyType)

      // fetch stories
      API.stories(storyType)
        .then((res) => {
          window.scrollTo(0, 0)
          items = res
          isLoading = false
          showLoadingIndicator = false
        })
        .catch((err) => {
          if (err instanceof InvalidStoryTypeError) {
            // show 404 error page
            navigate("/not-found", { replace: true })
          }
        })
    }
  }

  afterUpdate(() => {
    showSidebar.set(false)
  })

  onDestroy(() => {
    currentStoryType.set("")
  })
</script>

<svelte:head>
  <title>{storyType} · Svelte HN</title>
</svelte:head>

{#if items && !showLoadingIndicator}
  <ul class="items">
    {#each items as item, i}
      <li in:fade={{ duration: 100, delay: 10 * i }}>
        <NewsItem {item} num={i + 1} />
      </li>
    {/each}
  </ul>
{:else}
  <NewsItemsLoading />
{/if}
