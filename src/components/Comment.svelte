<script>
  export let comment

  import { createEventDispatcher } from "svelte"

  const dispatch = createEventDispatcher()

  const hue = (comment.level * 70 + 204) % 360 // rainbow
  const color = `hsl(${hue}, 50%, 50%);`
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
    padding: 0.5em;
    background-color: white;
    border-left: 0.25rem solid;
  }

  .firstLevel {
    border-left: 0;
  }

  .header {
    display: flex;
    justify-content: space-between;
    color: var(--color-text--faded);
    font-size: 1em;
    line-height: 1.2;
    margin-bottom: 1em;
  }

  h3 {
    font-size: 1em;
  }

  li {
    padding-left: 1em;
    border-left: 1px solid black;
  }

  .content {
    font-size: 1em;
    line-height: 1.2;
    padding-bottom: 1em;
  }

  :global(p + p) {
    margin-top: 1em;
  }
</style>

<div
  class="comment"
  style={`border-color: ${color}`}
  class:firstLevel
  on:click={toggleReplies}
>
  <div class="header">
    <h3 style={`color: ${color}`}>{comment.user}</h3>
    <span>{comment.time_ago}</span>
  </div>
  <div class="content">
    {@html comment.content}
  </div>
  <div class="footer">
    {#if commentCount > 0}
      <span>{commentCount} {commentString}</span>
    {/if}
  </div>
</div>
