<script>
  import { afterUpdate, onDestroy } from "svelte"
  import { navigate } from "svelte-routing"
  import { showSidebar, currentStoryType } from "../../store"
  import API from "../../api"
  import NewsItemsLoading from "./NewsItemsLoading.svelte"
  import { InvalidStoryTypeError } from "../../api/errors"
  import NewsItemList from "./NewsItemList.svelte"

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
  <NewsItemList {items} />
{:else}
  <NewsItemsLoading />
{/if}
