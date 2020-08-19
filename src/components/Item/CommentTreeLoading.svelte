<script>
  import CommentSkeleton from "./CommentSkeleton.svelte"

  export let itemCount = 5
</script>

<style>

</style>

{#each Array(itemCount) as _, index}
  <CommentSkeleton {index} />
{/each}
