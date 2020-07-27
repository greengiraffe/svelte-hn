<script>
  import Icon from "svelte-awesome"
  import {
    faBriefcase,
    faComment,
    // faBurn,
    faBookmark,
  } from "@fortawesome/free-solid-svg-icons"
  import { link } from "svelte-routing"
  import SwipeToAction from "./SwipeToAction.svelte"

  export let item
  export let num

  let liked = false

  function like() {
    liked = !liked
  }
</script>

<style>
  a {
    color: var(--color-title);
  }

  a:visited {
    color: var(--color-title--faded);
  }

  .item {
    display: grid;
    grid-template-areas:
      "side title title"
      "side url comments"
      "side meta comments";
    grid-template-columns: 3em 1fr 6em;
    grid-template-rows: auto;
    grid-gap: 0 0.5em;
    border-top: 1px solid var(--color-newsitem-border);
    background-color: var(--color-background);
  }

  .side {
    grid-area: side;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: var(--color-newsitem-bg-side);
    width: 100%;
    font-size: 0.8em;
    padding: 0.25em 0.5em;
  }

  .num {
    font-weight: 700;
    color: var(--color-text--faded);
    line-height: 1.2em;
  }

  .url {
    grid-area: url;
    font-size: 0.8em;
    color: var(--color-text--faded);
  }

  .points {
  }

  .title {
    grid-area: title;
    font-size: 1em;
    line-height: 1.2;
    font-weight: 600;
    padding: 0.25em 0.5em 0 0;
  }

  .meta {
    grid-area: meta;
    font-size: 0.8em;
    color: var(--color-text--faded);
    padding-bottom: 0.25em;
  }

  .comments {
    grid-area: comments;
    justify-self: end;
    align-self: end;
    padding: 0.25em 0.5em;
    margin: 0.25em;
    font-size: 0.8em;
    border: 1px solid var(--color-newsitem-border);
    border-radius: 5px;
  }

  .comments:hover {
    text-decoration: none;
    background-color: var(--color-newsitem-comments-hover);
  }

  .action {
    background-color: var(--color-newsitem-bg-action);
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: var(--color-background);
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
    fill: var(--color-bookmark-icon) !important;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  :global(.bookmark-icon.liked) {
    opacity: 1;
  }

  :global(.briefcase-icon) {
    fill: var(--color-newsitem-icon) !important;
    margin-bottom: 0.2em;
  }
</style>

<SwipeToAction on:action-right={like} on:action-left={like}>
  <div class="item" slot="content">
    <div class="side">
      <Icon data={faBookmark} class="bookmark-icon {liked ? 'liked' : ''}" />
      <div class="num">{num}</div>
      {#if item.points}
        <div class="points">{item.points}p</div>
      {/if}
      {#if item.type === 'job'}
        <Icon data={faBriefcase} class="briefcase-icon" />
      {/if}
    </div>
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
      <span>{item.domain}</span>
    </div>
    <a class="comments" href={`/item/${item.id}`} use:link>
      {item.comments_count}
      <Icon data={faComment} class="comments-icon" />
    </a>
  </div>
  <div slot="action-right" class="action right" class:liked>
    {#if liked}Unlike{:else}Like{/if}
  </div>
  <div slot="action-left" class="action left" class:liked>
    {#if liked}Unlike{:else}Like{/if}
  </div>
</SwipeToAction>
