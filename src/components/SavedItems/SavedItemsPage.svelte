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
    const trimmedSearchValue = searchValue.trim()
    return (
      trimmedSearchValue.length === 0 ||
      item.title.includes(trimmedSearchValue) ||
      item.user.includes(trimmedSearchValue) ||
      item.url.includes(trimmedSearchValue)
    )
  })
</script>

<style>
  .empty-wrapper {
    padding: 1em;
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
    background-color: var(--color-background);
  }
</style>

<svelte:head>
  <title>Saved Stories · Svelte HN</title>
</svelte:head>

{#if $savedStories.length > 0}
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
  <SavedItemList items={filteredStories} />
{:else}
  <div class="empty-wrapper">
    <p>No stories saved.</p>
  </div>
{/if}
