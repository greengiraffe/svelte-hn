<script>
  import CommentSkeleton from "./CommentSkeleton.svelte"

  const maxCount = 15
  const minCount = 6

  export let itemCount = minCount

  const count = Math.min(Math.max(itemCount, minCount), maxCount)
</script>

<style>

</style>

{#each Array(count) as _, index}
  <CommentSkeleton {index} />
{/each}
