<script>
  import { onMount } from "svelte"
  import API from "../../api"
  import CommentTree from "./CommentTree.svelte"
  import LoadingOverlay from "../LoadingOverlay.svelte"

  // svelte-routing
  export let location
  export let id

  let item
  let pageTitle = "loading..."

  onMount(async () => {
    item = await API.item(id)
    pageTitle = item.title
  })
</script>

<style>
  .header {
    padding: 1em;
    background: var(--c-itempage-header-bg);
  }

  .title {
    font-size: 1.2em;
    line-height: 1.2;
  }

  .title a:visited {
    color: var(--c-itempage-header-link--visited);
  }

  .url {
    color: var(--c-itempage-url);
  }

  .meta {
    color: var(--c-itempage-meta);
  }
</style>

<svelte:head>
  <title>{pageTitle} · Svelte HN</title>
</svelte:head>

{#if item}
  <div class="header">
    <h2 class="title">
      <a href={item.url}>{item.title}</a>
    </h2>
    <div class="url">{item.domain}</div>
    <div class="meta">
      posted {item.time_ago} by {item.user} · {item.points} points · {item.comments_count}
      comments
    </div>
  </div>

  <CommentTree comments={item.comments} />
{:else}
  <LoadingOverlay />
{/if}
