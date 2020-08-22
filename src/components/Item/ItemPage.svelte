<script>
  import { onMount, onDestroy, tick, beforeUpdate } from "svelte"
  import { fade } from "svelte/transition"
  import Icon from "svelte-awesome"
  import { faBookmark } from "@fortawesome/free-solid-svg-icons"
  import {
    selectedStory,
    savedStories,
    saveStory,
    removeSavedStory,
  } from "../../store"
  import API from "../../api"
  import CommentTree from "./CommentTree.svelte"
  import CommentTreeLoading from "./CommentTreeLoading.svelte"
  import TitleBar from "../TitleBar/TitleBar.svelte"

  export let id

  let item = $selectedStory
  let liked = false
  let showAbsoluteDate = false

  $: fullDate = new Date(item.time * 1000).toLocaleString("en-GB")
  $: dateString = showAbsoluteDate
    ? `posted on ${fullDate}`
    : `posted ${item.time_ago}`
  $: dateHover = showAbsoluteDate ? item.time_ago : fullDate

  onMount(async () => {
    item = await API.item(id)
  })

  beforeUpdate(() => {
    if (!liked) {
      const savedStory = $savedStories.find((story) => story.id === item.id)
      if (savedStory) {
        // if item is already loaded, use it. Otherwise use the saved story item
        item = item.title ? item : savedStory
        liked = true
      }
    }
  })

  onDestroy(() => {
    selectedStory.set({})
  })

  function like(event) {
    if (event.type === "keydown" && event.code !== "Enter") return
    if (liked) {
      removeSavedStory(item)
    } else {
      saveStory(item)
    }
    liked = !liked
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

  .like-icon {
    position: absolute;
    top: -0.6em;
    right: 1em;
    transition: top 200ms ease;
  }

  .like-icon:hover,
  .like-icon:focus,
  .like-icon.liked {
    top: -2px;
  }

  :global(.item-header .bookmark-icon) {
    fill: var(--c-itempage-bookmark);
  }

  :global(.item-header .bookmark-icon.liked) {
    fill: var(--c-itempage-bookmark--active);
  }

  .url {
    color: var(--c-itempage-url);
  }

  .meta {
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

  .comments {
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

<TitleBar />

<main>
  <div class="item-header">
    {#if item.title}
      <h2 class="title">
        {#if item.domain}
          <a href={item.url}>{item.title}</a>
        {:else}{item.title}{/if}
      </h2>
      {#if item.domain}
        <div class="url">{item.domain}</div>
      {:else}
        <div aria-hidden class="url">——</div>
      {/if}
      <div
        class="like-icon"
        class:liked
        on:click={like}
        tabindex="0"
        aria-label={liked ? 'remove bookmark' : 'bookmark'}
      >
        <Icon
          scale={2}
          data={faBookmark}
          class="bookmark-icon {liked ? 'liked' : ''}"
        />
      </div>

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
        <div class="content" in:fade={{ duration: 200 }}>
          {@html item.content}
        </div>
      {/if}
    {:else}
      <h2 class="title loading">Loading...</h2>
    {/if}
  </div>

  <div class="comments" in:fade={{ duration: 50 }}>
    {#if item.comments}
      {#if item.comments.length > 0}
        <CommentTree comments={item.comments} />
      {:else}
        <p class="no-comments">There are no comments.</p>
      {/if}
    {:else}
      <div class="loading-wrapper">
        <CommentTreeLoading itemCount={item.comments_count || 5} />
      </div>
    {/if}
  </div>
</main>
