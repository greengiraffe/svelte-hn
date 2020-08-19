<script>
  import Comment from "./Comment.svelte"
  import { expandAllComments } from "../../store"

  export let comments = []

  $: expandedReplies = $expandAllComments ? getAllCommentIds() : []

  /**
   * Recursively retrieve all comment IDs
   */
  function getAllCommentIds() {
    function evalReplies(comment, acc) {
      if (comment.comments.length > 0) {
        for (const reply of comment.comments) {
          acc.push(reply.id)
          evalReplies(reply, acc)
        }
      }
    }

    var acc = []
    for (const comment of comments) {
      acc.push(comment.id)
      evalReplies(comment, acc)
    }
    return acc
  }

  function toggleReplies(event) {
    const id = event.detail
    if (expandedReplies.indexOf(id) !== -1) {
      // immutable remove from array
      expandedReplies = expandedReplies.filter((i) => i !== id)
    } else {
      // immutable add to array
      expandedReplies = [...expandedReplies, id]
    }
  }
</script>

<style>
  .comment-tree {
    will-change: height, padding-top, padding-bottom, margin-top, margin-bottom;
    background-color: var(--c-commenttree-bg);
  }

  /* Indent from second level on */
  :global(.comment + .comment-tree) {
    padding-left: 0.5rem;
  }
</style>

<!-- TODO Find more elegant solution to prevent transition on outer comment tree -->
<ul class="comment-tree">
  {#each comments as comment}
    <li>
      <Comment
        {comment}
        on:toggle-replies={toggleReplies}
        showingReplies={expandedReplies.indexOf(comment.id) !== -1}
      />
      {#if expandedReplies.indexOf(comment.id) !== -1}
        <svelte:self comments={comment.comments} />
      {/if}
    </li>
  {/each}
</ul>
