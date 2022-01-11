<script>
  import { onMount, onDestroy, beforeUpdate } from "svelte"
  import { fade, slide } from "svelte/transition"
  import { quadInOut } from "svelte/easing"
  import { useFocus } from "svelte-navigator"
  import Icon from "svelte-awesome"
  import {
    faBaby,
    faBookmark,
    faExternalLinkAlt,
  } from "@fortawesome/free-solid-svg-icons"
  import { faBookmark as faBookmarkRegular } from "@fortawesome/free-regular-svg-icons"
  import {
    selectedStory,
    bookmarks,
    bookmark,
    removeBookmark,
  } from "../../store"
  import { fadeScale } from "../../helper/transitions"
  import API from "../../api"
  import CommentTree from "./CommentTree.svelte"
  import CommentTreeLoading from "./CommentTreeLoading.svelte"
  import TitleBar from "../TitleBar/TitleBar.svelte"
  import TitleBarMenu from "../TitleBar/TitleBarMenu.svelte"
  import TitleBarMenuItem from "../TitleBar/TitleBarMenuItem.svelte"
  import TitleBarIconButton from "../TitleBar/TitleBarIconButton.svelte"
  import StoryCache from "../../helper/storyCache"

  let item = $selectedStory
  let isBookmarked = false
  let showAbsoluteDate = false
  let registerFocus = useFocus()
  let showLoading = false

  $: fullDate = new Date(item.time * 1000).toLocaleString("en-GB")
  $: dateString = showAbsoluteDate
    ? `posted on ${fullDate}`
    : `posted ${item.time_ago}`
  $: dateHover = showAbsoluteDate ? item.time_ago : fullDate

  onMount(async () => {
    window.scrollTo(0, 0)
    const itemID = new URLSearchParams(location.search).get("id")
    setTimeout(() => {
      if (!item.comments) {
        showLoading = true
      }
    }, 200)

    const cachedItem = await StoryCache.get(itemID)
    if (cachedItem !== undefined) {
      item = cachedItem
      // Update cached item via network
      StoryCache.fetchAndUpdate(itemID)
    } else {
    item = await API.item(itemID)
    }
  })

  beforeUpdate(() => {
    if (!isBookmarked) {
      const savedStory = $bookmarks.find((story) => story.id === item.id)
      if (savedStory) {
        // if item is already loaded, use it. Otherwise use the bookmarked story item
        item = item.title ? item : savedStory
        isBookmarked = true
      }
    }
  })

  function bookmarkThis(event) {
    if (event.type === "keydown" && event.code !== "Enter") return
    if (isBookmarked) {
      removeBookmark(item)
    } else {
      bookmark(item)
    }
    isBookmarked = !isBookmarked
  }

  function toggleShowAbsoluteDate() {
    showAbsoluteDate = !showAbsoluteDate
  }
</script>

<style>
  .item-header {
    position: relative;
    padding: 1em;
    background: var(--c-itempage-header-bg);
  }

  .title {
    font-size: 1.2em;
    line-height: 1.4;
    color: var(--c-link);
    margin-right: 1.75em;
    font-weight: 500;
  }

  .title a:focus {
    text-decoration: underline;
    outline: 0;
  }

  .title a:visited {
    color: var(--c-itempage-header-link--visited);
  }

  .title.loading {
    color: var(--c-link);
    margin-bottom: 2em;
  }

  .url {
    color: var(--c-itempage-url);
  }

  .meta {
    margin-top: 1em;
    color: var(--c-itempage-meta);
  }

  .content {
    margin-top: 1em;
  }

  @keyframes loading {
    to {
      opacity: 0.75;
    }
  }

  .comments-wrapper {
    position: relative;
  }

  .no-comments {
    margin: 1em;
  }

  .loading-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
</style>

<svelte:head>
  <title>{item.title || 'Loading...'} · Svelte HN</title>
</svelte:head>

<TitleBar text="">
  <TitleBarIconButton
    icon={isBookmarked ? faBookmark : faBookmarkRegular}
    style={`${isBookmarked && 'color: var(--c-itempage-bookmark--active);'}`}
    title={isBookmarked ? "Remove bookmark" : "Bookmark"}
    on:click={bookmarkThis}
  />
  <TitleBarMenu>
    <TitleBarMenuItem icon={faExternalLinkAlt}>
      <a href={'https://news.ycombinator.com/item?id=' + item.id}>
        Show on news.ycombinator.com
      </a>
    </TitleBarMenuItem>
  </TitleBarMenu>
</TitleBar>

<main>
  <div class="item-header">
    {#if item.title}
      <h1 class="title">
        <a href={item.url} use:registerFocus>{item.title}</a>
      </h1>
      {#if item.domain}
        <div class="url">{item.domain}</div>
      {:else}
        <div aria-hidden class="url">——</div>
      {/if}

      <div class="meta">
        <span
          class="date-toggle"
          on:click={toggleShowAbsoluteDate}
          title={dateHover}
        >
          {dateString}
        </span>
        by {item.user} · {item.points} points · {item.comments_count} comments
      </div>
      {#if item.content}
        <div class="content" in:slide={{ duration: 200 }}>
          {@html item.content}
        </div>
      {/if}
    {:else}
      <h2 class="title loading">Loading...</h2>
    {/if}
  </div>

  <div class="comments-wrapper">
    {#if item.comments}
      <div
        class="comments"
        in:fadeScale={{ duration: showLoading ? 200 : 0, delay: showLoading ? 200 : 0, baseScale: 0.97, easing: quadInOut }}
      >
        {#if item.comments.length > 0}
          <CommentTree comments={item.comments} />
        {:else}
          <p class="no-comments">There are no comments.</p>
        {/if}
      </div>
    {:else}
      <div
        class="loading-wrapper"
        in:fade={{ duration: 100, delay: 200 }}
        out:fadeScale={{ duration: 200, baseScale: 0.97, easing: quadInOut }}
      >
        <CommentTreeLoading itemCount={item.comments_count} />
      </div>
    {/if}
  </div>
</main>
