<script>
  import { slide } from "svelte/transition"
  import Comment from "./Comment.svelte"

  export let comments = []
  export let expandAllReplies = false // experimental
  let expandedReplies = expandAllReplies ? getAllCommentIds() : []

  /**
   * Recursively retrieve all comment IDs
   */
  function getAllCommentIds() {
    function evalChildren(comment, acc) {
      if (comment.comments.length > 0) {
        for (const child of comment.comments) {
          acc.push(child.id)
          evalChildren(child, acc)
        }
      }
    }
    const acc = []
    for (const comment of comments) {
      acc.push(comment.id)
      evalChildren(comment, acc)
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
  /* Indent from second level on */
  :global(.comment + .comment-tree .comment + .comment-tree) {
    padding-left: 0.25rem;
  }
</style>

<!-- TODO Prevent transition on outer comment tree -->
<ul class="comment-tree" transition:slide={{ duration: 300 }}>
  {#each comments as comment}
    <li>
      <Comment {comment} on:toggle-replies={toggleReplies} />
      {#if expandedReplies.indexOf(comment.id) !== -1}
        <svelte:self comments={comment.comments} />
      {/if}
    </li>
  {/each}
</ul>
