<script>
  import Icon from "svelte-awesome"
  import {
    faBriefcase,
    faComments,
    // faBurn,
    faBookmark,
  } from "@fortawesome/free-solid-svg-icons"
  import { navigate } from "svelte-navigator"
  import { beforeUpdate } from "svelte"
  import {
    bookmark,
    removeBookmark,
    selectedStory,
    lastFocused,
    checkIfBookmarked,
  } from "../../store"
  import SwipeToAction from "../SwipeToAction.svelte"

  export let item
  export let rank = false

  let isBookmarked = false

  beforeUpdate(() => {
    // mark bookmarked stories
    isBookmarked = checkIfBookmarked(item.id)
  })

  function bookmarkThis() {
    if (isBookmarked) {
      removeBookmark(item)
    } else {
      bookmark(item)
    }
    isBookmarked = !isBookmarked
  }

  function setSelectedStory(event) {
    selectedStory.set(item)
    lastFocused.set(item.id)
    navigate(event.target.href)
  }
</script>

<style>
  a {
    color: var(--c-newsitem-title);
  }

  a:hover,
  a:focus {
    color: var(--c-newsitem-title--hover);
  }

  a:visited {
    color: var(--c-newsitem-title--visited);
  }

  .item {
    min-height: 4em;
    display: grid;
    grid-template-areas:
      "side title comments"
      "side url comments"
      "side meta comments";
    grid-template-columns: 3em 1fr 5em;
    grid-template-rows: auto;
    grid-gap: 0 0.5em;
    border-top: 1px solid var(--c-newsitem-border);
    background-color: var(--c-newsitem-bg);
  }

  .side {
    grid-area: side;
    border-radius: 0;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--c-newsitem-side-bg);
    width: 100%;
    font-size: 0.8em;
    padding: 0.5em 0.5em;
  }

  :global(.side:hover .bookmark-icon:not(.isBookmarked), .side:focus
      .bookmark-icon:not(.isBookmarked)) {
    opacity: 0.4;
  }

  .rank {
    font-weight: 700;
    color: var(--c-newsitem-rank);
    line-height: 1.2em;
  }

  .url {
    grid-area: url;
    font-size: 0.8em;
    color: var(--c-newsitem-url);
  }

  .no-url {
    grid-area: url;
    color: var(--c-newsitem-no-url);
  }

  .points {
    color: var(--c-newsitem-points);
  }

  .title {
    grid-area: title;
    font-size: 1em;
    line-height: 1.2;
    font-weight: 500;
    letter-spacing: 0.01em;
    padding: 0.5em 0.5em 0 0;
  }

  .meta {
    grid-area: meta;
    font-size: 0.8em;
    color: var(--c-newsitem-meta);
    padding-bottom: 0.5em;
  }

  .comments {
    grid-area: comments;
    justify-self: center;
    align-self: center;
    padding: 0.5em;
    font-size: 0.8em;
    border-radius: 5px;
  }

  .comments:hover,
  .comments:focus {
    text-decoration: none;
    background-color: var(--c-newsitem-comments-bg--hover);
  }

  .action {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-weight: 500;
    color: var(--c-newsitem-swipetoaction-text);
    background-color: var(--c-newsitem-swipetoaction-bg);
    padding: 0 1em;
    height: 100%;
  }

  :global(.comments-icon) {
    vertical-align: sub;
    margin-left: 5px;
  }

  :global(.item .bookmark-icon) {
    position: absolute;
    right: 0;
    top: -1px;
    opacity: 0;
    transition: opacity 0.2s ease, fill 0.2s ease;
    color: var(--c-newsitem-bookmark);
  }

  :global(.item .bookmark-icon.isBookmarked) {
    opacity: 1;
  }

  :global(.item .briefcase-icon) {
    color: var(--c-newsitem-job-icon);
    margin-top: 1em;
  }
</style>

<SwipeToAction on:action-right={bookmarkThis} on:action-left={bookmarkThis}>
  <div class="item" slot="content">

    <!-- TITLE -->
    <h2 class="title">
      {#if item.domain}
        <a href={item.url}>{item.title}</a>
      {:else}
        <a href={item.url} on:click|preventDefault={setSelectedStory}>
          {item.title}
        </a>
      {/if}
    </h2>
    <!-- DOMAIN -->
    {#if item.domain}
    <div class="url">{item.domain}</div>
  {:else}
    <div aria-hidden class="no-url">——</div>
  {/if}
    <!-- CREDITS -->
    <div class="meta">
      {item.time_ago}
      {#if item.user}
        by {item.user}
      {/if}
    </div>

    <!-- BOOKMARK BUTTON & RANK INFO -->
    <button
      class="side"
      on:click={bookmarkThis}
      type="button"
      aria-pressed={isBookmarked}
      aria-label={"bookmark"}
      title={isBookmarked ? "Remove bookmark" : "Add bookmark"}
    >
      <Icon
        data={faBookmark}
        class="bookmark-icon {isBookmarked ? 'isBookmarked' : ''}"
        on:click={bookmarkThis}
      />
      {#if rank}
        <div class="rank"><span class="screenreader-text">item rank </span>{rank}</div>
      {/if}
      {#if item.points}
        <div class="points">
          {item.points}<span aria-hidden="true">p</span><span class="screenreader-text"> points</span></div>
      {/if}
      {#if item.type === 'job'}
        <Icon data={faBriefcase} class="briefcase-icon"/>
        <span class="screenreader-text">job item</span>
      {/if}
    </button>

    {#if item.type !== 'job'}
      <a
        class="comments"
        href={`/item?id=${item.id}`}
        aria-label={`show ${item.comments_count} comments`}
        on:click|preventDefault={setSelectedStory}
      >
        {item.comments_count}
        <Icon data={faComments} class="comments-icon" />
      </a>
    {/if}
  </div>
  <div
    slot="action-right"
    class="action right"
    class:isBookmarked
    aria-hidden="true"
  >
    {#if isBookmarked}Remove{:else}Bookmark{/if}
  </div>
  <div
    slot="action-left"
    class="action left"
    class:isBookmarked
    aria-hidden="true"
  >
    {#if isBookmarked}Remove{:else}Bookmark{/if}
  </div>
</SwipeToAction>
