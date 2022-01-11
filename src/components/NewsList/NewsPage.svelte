<script>
  import { onDestroy, onMount, tick } from "svelte"
  import { navigate } from "svelte-navigator"
  import Icon from "svelte-awesome"
  import {
    newsItems,
    currentStoryType,
    selectedStory,
    scrollY,
    lastScrollY,
  } from "../../store"
  import API from "../../api"
  import NewsItemsLoading from "./NewsItemsLoading.svelte"
  import { InvalidStoryTypeError } from "../../api/errors"
  import NewsItemList from "./NewsItemList.svelte"
  import { faArrowUp } from "@fortawesome/free-solid-svg-icons"
  import TitleBar from "../TitleBar/TitleBar.svelte"

  export let storyType // passed by svelte-navigator from App.svelte

  let showLoadingIndicator = false
  let currentPage = 1
  let hasMorePages = true

  const PAGE_SIZE = 30

  $: if (storyType !== $currentStoryType) loadInitialItems()

  onMount(() => {
    if ($selectedStory.id) {
      const itemToFocus = document.querySelector(
        `a[href*='${$selectedStory.id}'`
      )
      if (itemToFocus) itemToFocus.focus()
    }
    window.scrollTo({ top: $lastScrollY })
    lastScrollY.set(0)
    selectedStory.set({})
  })

  onDestroy(() => {
    lastScrollY.set($scrollY)
  })

  function loadInitialItems() {
    window.scrollTo(0, 0)
    const LOADING_INDICATOR_DELAY = 200 // ms
    let isLoading = true
    currentPage = 1
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
        newsItems.set(res)
        isLoading = false
        showLoadingIndicator = false
        getFocusableElements()[0].focus()
      })
      .catch((err) => {
        if (err instanceof InvalidStoryTypeError) {
          // show 404 error page
          navigate("/not-found", { replace: true })
        }
      })
  }

  async function loadNextPage() {
    currentPage += 1

    // add empty items while loading to show skeleton loaders
    const currentItemCount = $newsItems.length
    newsItems.update((items) => {
      return [...items, ...Array(PAGE_SIZE)]
    })

    // keep scrollY for scroll restoration after new items
    // were loaded
    const currentScrollY = $scrollY

    API.stories($currentStoryType, currentPage)
      .then(async (res) => {
        if (res.length < PAGE_SIZE) {
          hasMorePages = false
        }
        // replace empty items with loaded items
        newsItems.update((items) => {
          return [...items.slice(0, currentItemCount), ...res]
        })

        // Focus next new element after they have been rendered
        await tick()
        const nextItem = document.querySelectorAll(".item")[
          PAGE_SIZE * (currentPage - 1)
        ]
        getFocusableElements(nextItem)[0].focus()
        // Prevent browser from scrolling due to the newly set focus
        window.scrollTo({ top: currentScrollY })
      })
      .catch((err) => {
        console.error(err)
      })
  }

  function scrollToTop() {
    window.scrollTo(0, 0)
    getFocusableElements()[0].focus()
  }

  function getFocusableElements(node) {
    const focusableElementsSelector = 'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    if (node !== undefined) {
      return node.querySelectorAll(focusableElementsSelector)
    }
    return document.querySelectorAll(focusableElementsSelector);
  }
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
    right: 0;
    margin: 0.5em;
  }
</style>

<svelte:head>
  <title>{storyType} · Svelte HN</title>
</svelte:head>

<TitleBar isPrimaryHeading text={$currentStoryType} />

<main>
  {#if $newsItems && !showLoadingIndicator}
    <NewsItemList
      items={$newsItems}
      delayTransition={currentPage === 1}
      showTransition={!$newsItems}
    />
    <div class="more-wrapper">
        {#if hasMorePages}
        <button class="more-button" on:click={loadNextPage}>Load more</button>
        {:else}
          <p class="no-more-pages">No more pages to load.</p>
        {/if}
        <button type="button" class="up-button" on:click={scrollToTop}>
          Back to top <Icon data={faArrowUp} />
        </button>
      </div>
  {:else}
    <NewsItemsLoading />
  {/if}
</main>
