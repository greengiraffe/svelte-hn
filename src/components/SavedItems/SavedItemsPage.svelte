<script>
  import { afterUpdate } from "svelte"
  import Icon from "svelte-awesome"
  import { showSidebar } from "../../store"
  import { savedStories } from "../../store"
  import SavedItemList from "./SavedItemList.svelte"
  import { faSearch } from "@fortawesome/free-solid-svg-icons"

  let searchValue = ""

  afterUpdate(() => {
    showSidebar.set(false)
  })

  $: filteredStories = $savedStories.filter((item) => {
    const trimmedSearchValue = searchValue.trim().toLowerCase()

    return (
      trimmedSearchValue.length === 0 ||
      item.title.toLowerCase().includes(trimmedSearchValue) ||
      item.user.toLowerCase().includes(trimmedSearchValue) ||
      item.url.toLowerCase().includes(trimmedSearchValue)
    )
  })

  function removeAllSavedStories() {
    const remove = confirm(
      `Are you sure you want to remove all ${$savedStories.length} bookmarks?`
    )
    if (remove) {
      savedStories.set([])
    }
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

  .action-wrapper {
    display: flex;
    height: 4em;
    justify-content: center;
    align-items: center;
    border-top: var(--c-newsitem-border);
  }
</style>

<svelte:head>
  <title>Saved Stories · Svelte HN</title>
</svelte:head>

<div class="search-wrapper">
  <label class="search-label" for="search">
    <Icon data={faSearch} />
  </label>
  <input
    class="search-input"
    id="search"
    type="text"
    placeholder="Search for story by title, author or URL"
    bind:value={searchValue}
  />
</div>
{#if $savedStories.length > 0}
  <SavedItemList items={filteredStories} />
  <div class="action-wrapper">
    <button class="remove-all" on:click={removeAllSavedStories}>
      Remove all bookmarks
    </button>
  </div>
{:else}
  <div class="empty-wrapper">
    <p>No stories saved.</p>
    <p>
      Add a bookmark by dragging a story in the list left or right.
      Alternatively click the bookmark icon that appears when hovering over the
      left side of an item.
    </p>
  </div>
{/if}
