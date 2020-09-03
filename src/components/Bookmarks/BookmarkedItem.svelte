<script>
  import Icon from "svelte-awesome"
  import {
    faBriefcase,
    faComments,
    // faBurn,
    faBookmark,
    faTrash,
  } from "@fortawesome/free-solid-svg-icons"
  import { navigate } from "svelte-navigator"
  import { fade } from "svelte/transition"
  import { removeBookmark, selectedStory } from "../../store"
  import SwipeToAction from "../SwipeToAction.svelte"

  export let item

  let showRemoveConfirmation = false

  const dateString = new Date(item.time * 1000).toLocaleString("en-GB", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  })
  const metaInfoString = [
    item.domain || "news.ycombinator.com",
    item.user ? "posted by " + item.user : "",
    dateString,
  ].join(" · ")

  function showConfirmRemove(event) {
    if (event.type === "keydown" && event.code !== "Enter") return
    showRemoveConfirmation = true
  }

  function hideConfirmRemove() {
    showRemoveConfirmation = false
  }

  function removeThisBookmark() {
    showRemoveConfirmation = false
    removeBookmark(item)
  }

  function setSelectedStory(event) {
    selectedStory.set(item)
    navigate(event.target.href)
  }

  // based on the ago function from https://github.com/odyniec/tinyAgo-js
  function timeAgo(timestamp) {
    let date = (Date.now() - timestamp) / 1000
    const length = {
      second: 60,
      minute: 60,
      hour: 24,
      day: 7,
      week: 4.35,
      month: 12,
      year: 10000,
    }

    let result
    let unit
    for (unit in length) {
      result = Math.floor(date % length[unit])
      if (!(date = 0 | (date / length[unit])))
        return `saved ${result} ${result - 1 ? unit + "s" : unit} ago`
    }
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
    position: relative;
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

  .confirm-remove {
    position: absolute;
    padding: 1em;
    background-color: var(--c-background);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    outline: 1px solid var(--c-border);
  }

  .confirm-remove button {
    margin-left: 1em;
  }

  .side {
    grid-area: side;
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

  .url {
    grid-area: url;
    font-size: 0.8em;
    color: var(--c-newsitem-url);
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
    font-weight: 600;
    color: var(--c-newsitem-swipetoaction-text);
    background-color: var(--c-newsitem-swipetoaction-bg);
    padding: 0 1em;
    height: 100%;
  }

  /* Global rules also defined in NewsItem component,
    left here commented out for reference
   */

  /*
  :global(.confirm-remove button .trash-icon) {
    margin: 0 0.25em -1px 0.25em;
  }

  :global(.side:hover .bookmark-icon:not(.isBookmarked), .side:focus
    .bookmark-icon:not(.isBookmarked)) {
    opacity: 0.4;
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
  }

  :global(.item .bookmark-icon.isBookmarked) {
    fill: var(--c-newsitem-bookmark);
    opacity: 1;
  }

  :global(.item .briefcase-icon) {
    fill: var(--c-newsitem-job-icon);
    margin-top: 1em;
  }
  */
</style>

<SwipeToAction
  on:action-right={showConfirmRemove}
  on:action-left={showConfirmRemove}
>
  <div slot="content">
    <div class="item">
      {#if showRemoveConfirmation}
        <div class="confirm-remove" in:fade={{ duration: 150 }}>
          Remove this bookmark?
          <button on:click={removeThisBookmark}>
            <Icon data={faTrash} class="trash-icon" />
            Remove
          </button>
          <button on:click={hideConfirmRemove}>Cancel</button>
        </div>
      {/if}

      <div
        class="side"
        on:click={showConfirmRemove}
        on:keydown={showConfirmRemove}
        tabindex="0"
        aria-label="remove bookmark"
      >
        <Icon
          data={faBookmark}
          class="bookmark-icon isBookmarked"
          on:click={showConfirmRemove}
        />

        {#if item.points}
          <div class="points">{item.points}p</div>
        {/if}

        {#if item.type === 'job'}
          <Icon data={faBriefcase} class="briefcase-icon" />
        {/if}
      </div>

      <h2 class="title">
        {#if item.domain}
          <a href={item.url}>{item.title}</a>
        {:else}
          <a href={item.url} on:click|preventDefault={setSelectedStory}>
            {item.title}
          </a>
        {/if}
      </h2>

      <div class="url">{metaInfoString}</div>
      <div class="meta">{timeAgo(item.savedAt)}</div>

      {#if item.type !== 'job'}
        <a
          class="comments"
          href={`/item?id=${item.id}`}
          on:click|preventDefault={setSelectedStory}
        >
          {item.comments_count}+
          <Icon data={faComments} class="comments-icon" />
        </a>
      {/if}
    </div>
  </div>

  <div slot="action-right" class="action right isBookmarked" aria-hidden="true">
    Remove
  </div>

  <div slot="action-left" class="action left isBookmarked" aria-hidden="true">
    Remove
  </div>

</SwipeToAction>
