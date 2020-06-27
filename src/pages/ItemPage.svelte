<script>
  import { onMount } from "svelte"
  import API from "../api"
  import CommentTree from "../components/CommentTree.svelte"

  // svelte-routing
  export let location
  export let id

  let item

  onMount(async () => {
    item = await API.item(id)
  })
</script>

<style>
  .header {
    padding: 0.5em;
  }

  h2 {
    font-size: 1em;
    line-height: 1.2;
  }
</style>

{#if item}
  <div class="header">
    <h2 class="title">
      <a href={item.url}>{item.title}</a>
    </h2>
    <div class="url">
      <span>{item.domain}</span>
    </div>
    <div class="meta">
      <span>{item.time_ago} by {item.user}</span>
    </div>
  </div>

  <CommentTree comments={item.comments} />
{/if}
