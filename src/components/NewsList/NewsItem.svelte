<script>
  import Icon from "svelte-awesome"
  import {
    faBriefcase,
    faComments,
    // faBurn,
    faBookmark,
  } from "@fortawesome/free-solid-svg-icons"
  import { link } from "svelte-routing"
  import { beforeUpdate } from "svelte"
  import { get } from "svelte/store"
  import { savedStories, saveStory, removeSavedStory } from "../../store"
  import SwipeToAction from "../SwipeToAction.svelte"

  export let item
  export let rank

  let liked = false

  beforeUpdate(() => {
    // mark saved stories
    liked = get(savedStories).some((story) => story.id === item.id)
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

  :global(.side:hover .bookmark-icon:not(.liked), .side:focus
      .bookmark-icon:not(.liked)) {
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
    color: var(--c-newsitem-no-url);
  }

  .points {
    color: var(--c-newsitem-points);
  }

  .title {
    grid-area: title;
    font-size: 1em;
    line-height: 1.2;
    font-weight: 600;
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
    color: var(--c-newsitem-swipetoaction-text);
    background-color: var(--c-newsitems-swiptetoaction-bg);
    padding: 0 1em;
    height: 100%;
  }

  :global(.comments-icon) {
    vertical-align: sub;
    margin-left: 5px;
  }

  :global(.bookmark-icon) {
    position: absolute;
    right: 0;
    top: -1px;
    opacity: 0;
    transition: opacity 0.2s ease, fill 0.2s ease;
  }

  :global(.bookmark-icon.liked) {
    fill: var(--c-newsitem-bookmark) !important;
    opacity: 1;
  }

  :global(.briefcase-icon) {
    fill: var(--c-newsitem-job-icon) !important;
    margin-bottom: 0.2em;
  }
</style>

<SwipeToAction on:action-right={like} on:action-left={like}>
  <div class="item" slot="content">
    <h2 class="title">
      <a href={item.url}>{item.title}</a>
    </h2>
    <div class="meta">
      <span>{item.time_ago}</span>
      {#if item.user}
        <span>by {item.user}</span>
      {/if}
    </div>
    <div class="url">
      {#if item.domain}
        <span>{item.domain}</span>
      {:else}
        <span aria-hidden class="no-url">——</span>
      {/if}
    </div>
    <div
      class="side"
      on:click={like}
      on:keydown={like}
      tabindex="0"
      aria-label={liked ? 'remove bookmark' : 'bookmark'}
    >
      <Icon
        data={faBookmark}
        class="bookmark-icon {liked ? 'liked' : ''}"
        on:click={like}
      />
      {#if rank}
        <div class="rank">{rank}</div>
      {/if}
      {#if item.points}
        <div class="points">{item.points}p</div>
      {/if}
      {#if item.type === 'job'}
        <Icon data={faBriefcase} class="briefcase-icon" />
      {/if}
    </div>
    <a class="comments" href={`/item/${item.id}`} use:link>
      {item.comments_count}
      <Icon data={faComments} class="comments-icon" />
    </a>
  </div>
  <div slot="action-right" class="action right" class:liked aria-hidden="true">
    {#if liked}Unlike{:else}Like{/if}
  </div>
  <div slot="action-left" class="action left" class:liked aria-hidden="true">
    {#if liked}Unlike{:else}Like{/if}
  </div>
</SwipeToAction>
