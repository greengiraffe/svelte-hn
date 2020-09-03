<script>
  import { onMount, onDestroy } from "svelte"
  import Icon from "svelte-awesome"
  import {
    bookmarks,
    currentStoryType,
    selectedStory,
    lastScrollY,
    scrollY,
  } from "../../store"
  import BookmarkedItemList from "./BookmarkedItemList.svelte"
  import {
    faSearch,
    faTrash,
    faDownload,
  } from "@fortawesome/free-solid-svg-icons"
  import TitleBar from "../TitleBar/TitleBar.svelte"
  import TitleBarMenu from "../TitleBar/TitleBarMenu.svelte"
  import TitleBarMenuItem from "../TitleBar/TitleBarMenuItem.svelte"

  let searchValue = ""

  onMount(() => {
    currentStoryType.set("bookmarks")
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

  $: filteredStories = $bookmarks.filter((item) => {
    const trimmedSearchValue = searchValue.trim().toLowerCase()

    return Object.values(item).some((val) => {
      return (
        typeof val === "string" &&
        val.toLowerCase().includes(trimmedSearchValue)
      )
    })
  })

  function removeAllSavedStories() {
    const remove = confirm(
      `Are you sure you want to remove all ${$bookmarks.length} bookmarks?`
    )
    if (remove) {
      bookmarks.set([])
    }
  }

  function downloadBookmarks() {
    const element = document.createElement("a")
    element.setAttribute(
      "href",
      "data:application/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify($bookmarks))
    )
    element.setAttribute("download", "svelte-hn-bookmarks.json")
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }
</script>

<style>
  .empty-wrapper {
    padding: 1em;
    max-width: 35em;
    border-top: 1px solid var(--c-newsitem-border);
  }

  .search-wrapper {
    display: grid;
    grid-template-columns: 3em 1fr;
  }

  .search-label {
    align-self: center;
    justify-self: center;
    padding: 1.1em 0 0.9em 0;
  }

  .search-input {
    padding: 0.5em;
    border: 0;
    background-color: var(--c-background);
  }
  /* 
  .action-wrapper {
    display: flex;
    height: 4em;
    justify-content: center;
    align-items: center;
    border-top: var(--c-newsitem-border);
  } */
</style>

<svelte:head>
  <title>Saved Stories · Svelte HN</title>
</svelte:head>

<TitleBar>
  <TitleBarMenu>
    <TitleBarMenuItem
      icon={faTrash}
      text="Remove all bookmarks"
      on:click={removeAllSavedStories}
    />
    <TitleBarMenuItem
      icon={faDownload}
      text="Download as JSON"
      on:click={downloadBookmarks}
    />
  </TitleBarMenu>
</TitleBar>

<main>
  {#if $bookmarks.length > 0}
    <div class="search-wrapper">
      <label class="search-label" for="search">
        <Icon data={faSearch} />
      </label>
      <input
        class="search-input"
        id="search"
        type="text"
        placeholder="Search for story by title, author, type or URL"
        bind:value={searchValue}
      />
    </div>
    <BookmarkedItemList items={filteredStories} />
    <!-- <div class="action-wrapper">
    </div> -->
  {:else}
    <div class="empty-wrapper">
      <p>No stories bookmarked.</p>
      <p>
        Add a bookmark by dragging a story in the list left or right.
        Alternatively click the bookmark icon that appears when hovering over
        the left side of an item.
      </p>
    </div>
  {/if}
</main>
