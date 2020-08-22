<script>
  import { afterUpdate } from "svelte"
  import { navigate } from "svelte-navigator"
  import Icon from "svelte-awesome"
  import { newsItems, showSidebar, currentStoryType } from "../../store"
  import API from "../../api"
  import NewsItemsLoading from "./NewsItemsLoading.svelte"
  import { InvalidStoryTypeError } from "../../api/errors"
  import NewsItemList from "./NewsItemList.svelte"
  import { faArrowUp } from "@fortawesome/free-solid-svg-icons"
  import TitleBar from "../TitleBar/TitleBar.svelte"

  export let storyType // passed by svelte-navigator from App.svelte

  let isLoading = false
  let showLoadingIndicator = false
  let currentPage = 1
  let hasMorePages = true

  const PAGE_SIZE = 30

  $: if (storyType !== $currentStoryType) loadInitialItems()

  function loadInitialItems() {
    const LOADING_INDICATOR_DELAY = 200 // ms
    currentPage = 1
    isLoading = true
    hasMorePages = true

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
    API.stories(storyType, currentPage)
      .then((res) => {
        window.scrollTo(0, 0)
        newsItems.set(res)
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

  function loadNextPage() {
    currentPage += 1

    // TODO set focus

    // add empty items while loading
    const currentItemCount = $newsItems.length
    newsItems.update((items) => {
      return [...items, ...Array(PAGE_SIZE)]
    })

    API.stories($currentStoryType, currentPage)
      .then((res) => {
        if (res.length < PAGE_SIZE) {
          hasMorePages = false
        }
        // replace empty items with loaded items
        newsItems.update((items) => {
          return [...items.slice(0, currentItemCount), ...res]
        })

        isLoading = false
        showLoadingIndicator = false
      })
      .catch((err) => {
        console.error(err)
      })
  }

  function scrollToTop() {
    window.scrollTo(0, 0)
  }

  afterUpdate(() => {
    showSidebar.set(false)
  })
</script>

<style>
  .more-wrapper {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 4em;
    border-top: 1px solid var(--c-newsitem-border);
  }

  .up-button {
    position: absolute;
    left: 0;
    margin: 0.5em;
    width: 2em;
    height: 2em;
  }
</style>

<svelte:head>
  <title>{storyType} · Svelte HN</title>
</svelte:head>

<TitleBar />

<main>
  {#if $newsItems && !showLoadingIndicator}
    <NewsItemList items={$newsItems} delayTransition={currentPage === 1} />
    {#if hasMorePages}
      <div class="more-wrapper">
        <button class="more-button" on:click={loadNextPage}>Load more</button>
        <button class="up-button" on:click={scrollToTop}>
          <Icon class="up-button-icon" data={faArrowUp} />
        </button>
      </div>
    {:else}
      <div class="more-wrapper">
        <p class="no-more-pages">No more pages to load.</p>
        <button class="up-button" on:click={scrollToTop} title="Go up">
          <Icon data={faArrowUp} />
        </button>
      </div>
    {/if}
  {:else}
    <NewsItemsLoading />
  {/if}
</main>
