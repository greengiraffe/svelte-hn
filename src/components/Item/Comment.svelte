<script>
  export let comment
  export let showingReplies

  let replyToggleSymbol = "+"
  $: replyToggleSymbol = showingReplies ? "–" : "+"

  import { createEventDispatcher } from "svelte"

  const dispatch = createEventDispatcher()

  const fullDate = new Date(comment.time * 1000).toLocaleString()

  const hue = (comment.level * 70 + 204) % 360 // rainbow
  const color = `${hue}, 50%, 50%`
  const commentCount = comment.comments.length
  const commentString = commentCount === 1 ? "comment" : "comments"
  const firstLevel = comment.level === 0

  function toggleReplies(e) {
    if (!e.target.href && comment.comments.length > 0) {
      dispatch("toggle-replies", comment.id)
    }
  }
</script>

<style>
  .comment {
    --current-color: 128, 128, 128; /* set by JS, for indentation styles */
    padding: 1em;
    background-color: var(--color-background);
    border-left: 0.25rem solid;
    font-size: var(--font-size-s);
    border-color: hsl(var(--current-color));
    border-top: 1px solid hsla(var(--current-color), 0.3);
  }

  .firstLevel {
    border-left: 0;
  }

  .header {
    display: flex;
    justify-content: space-between;
    color: var(--color-text--faded);
    line-height: 1.2;
    margin-bottom: 1em;
  }

  h3 {
    font-size: inherit;
    color: hsl(var(--current-color));
  }

  li {
    padding-left: 1em;
    border-left: 1px solid black;
  }

  .content {
    line-height: 1.2;
    padding-bottom: 1em;
  }

  .footer {
    color: var(--color-text--faded);
  }

  .reply-toggle-symbol {
    display: inline-block;
    width: 1ch;
  }

  :global(p + p) {
    margin-top: 1em;
  }
</style>

<div
  class="comment"
  style={`--current-color: ${color}`}
  class:firstLevel
  on:click={toggleReplies}
>
  <div class="header">
    <h3>{comment.user}</h3>
    <span title={fullDate}>{comment.time_ago}</span>
  </div>
  <div class="content">
    {@html comment.content}
  </div>
  <div class="footer">
    {#if commentCount > 0}
      <span class="reply-toggle-symbol">{replyToggleSymbol}</span>
      <span class="comment-count">{commentCount} {commentString}</span>
    {/if}
  </div>
</div>
