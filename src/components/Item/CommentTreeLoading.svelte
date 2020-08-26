<script>
  import CommentSkeleton from "./CommentSkeleton.svelte"

  export let itemCount = 5
  
  const maxItemCount = 10
  const count = Math.min(itemCount, maxItemCount)
</script>

<style>

</style>

{#each Array(count) as _, index}
  <CommentSkeleton {index} />
{/each}
