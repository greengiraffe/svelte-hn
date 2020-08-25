<script>
  import { createEventDispatcher, onMount } from "svelte"
  import { darkMode } from "../../store"

  export let comment
  export let showingReplies

  let showAbsoluteDate = false
  let replyToggleSymbol = "+"
  $: replyToggleSymbol = showingReplies ? "–" : "+"

  const dispatch = createEventDispatcher()
  $: fullDate = new Date(comment.time * 1000).toLocaleString("en-GB")
  $: dateString = showAbsoluteDate ? fullDate : comment.time_ago
  $: dateHover = showAbsoluteDate ? comment.time_ago : fullDate

  const colors = {
    dark: [
      "204, 61%, 60%", // blue
      "170, 71%, 55%", // teal
      "126, 65%, 60%", // green
      "50, 65%, 60%", // yellow
      "24, 90%, 65%", // orange
      "0, 75%, 68%", // red
      "235, 98%, 80%", // purple
    ],
    light: [
      "204, 81%, 30%", // blue
      "160, 70%, 32%", // teal
      "90, 75%, 30%", // green
      "50, 80%, 33%", // yellow
      "24, 77%, 46%", // orange
      "0, 60%, 53%", // red
      "235, 98%, 62%", // purple
    ],
  }
  const mode = $darkMode ? "dark" : "light"
  const color = colors[mode][comment.level % colors[mode].length]
  const commentCount = comment.comments.length
  const commentString = commentCount === 1 ? "answer" : "answers"
  const firstLevel = comment.level === 0

  function toggleReplies(e) {
    if (!e.target.href && comment.comments.length > 0) {
      dispatch("toggle-replies", comment.id)
    }
  }

  function toggleShowAbsoluteDate() {
    showAbsoluteDate = !showAbsoluteDate
  }
</script>

<style>
  .comment {
    --current-color: 128, 128, 128; /* set by JS, for indentation styles */
    padding: 1em 1em 0.5em 1em;
    background-color: var(--c-comment-bg);
    border-left: 0.25rem solid;
    border-color: hsl(var(--current-color));
    border-top: 1px solid hsla(var(--current-color), 0.3);
    word-wrap: break-word;
  }

  :global(.comment a) {
    text-decoration: underline;
  }

  .header {
    display: flex;
    color: var(--c-comment-header);
    line-height: 1.2;
    margin-bottom: 1em;
  }

  .time-ago {
    margin-left: 0.45em;
  }

  h3 {
    font-size: inherit;
    color: hsl(var(--current-color));
  }

  .content {
    padding-bottom: 0.5em;
  }

  .footer {
    color: var(--c-comment-footer);
    display: flex;
  }

  .toggle-comments-button {
    margin-left: auto;
  }

  .reply-toggle-symbol {
    display: inline-block;
    width: 1ch;
  }

  :global(.comment p) {
    margin-top: 1em;
  }
</style>

<div class="comment" style={`--current-color: ${color}`} class:firstLevel>
  <div class="header">
    <h3>{comment.user}</h3>
    <span class="time-ago" title={dateHover} on:click={toggleShowAbsoluteDate}>
      · {dateString}
    </span>
  </div>
  <div class="content">
    {@html comment.content}
  </div>
  <div class="footer">
    {#if commentCount > 0}
      <button class="toggle-comments-button" on:click={toggleReplies}>
        <span class="reply-toggle-symbol">{replyToggleSymbol}</span>
        <span class="comment-count">{commentCount} {commentString}</span>
      </button>
    {/if}
  </div>
</div>
