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
    background: var(--color-commentpage-bg-header);
  }

  .title {
    font-size: 1.2em;
    line-height: 1.2;
  }

  .title a:visited {
    color: var(--color-title);
  }

  .url {
    color: var(--color-text--faded);
  }

  .meta {
    color: var(--color-text--faded);
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
      <span>
        posted {item.time_ago} by {item.user} · {item.points} points · {item.comments_count}
        comments
      </span>
    </div>
  </div>

  <CommentTree comments={item.comments} />
{/if}
