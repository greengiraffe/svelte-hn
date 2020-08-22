<script>
  import Icon from "svelte-awesome"
  import { currentStoryType } from "../store"
  import { faBars } from "@fortawesome/free-solid-svg-icons"
  import { showSidebar } from "../store"
  import { validStoryType } from "../api/storyTypes"
  import { beforeUpdate } from "svelte"

  let isNewsList = true

  beforeUpdate(() => {
    const path = location.pathname.slice(1, location.pathname.length)
    isNewsList = path.length === 0 || validStoryType(path)
  })
</script>

<style>
  header {
    display: flex;
    background-color: var(--c-titlebar-bg);
    position: fixed;
    width: 100%;
    height: 3em;
    z-index: 3;
    top: 0;
    left: 0;
  }

  h1 {
    color: var(--c-titlebar-text);
    display: inline;
    font-size: 1em;
    line-height: 2;
    flex: 1;
    padding: 0.5em 0.5em;
  }

  .menu {
    padding: 0.5em 0;
    flex: 0 0 3rem;
    text-align: center;
    display: flex;
    align-items: center;
    border-radius: 0;
    color: var(--c-titlebar-text);
    background-color: var(--c-titlebar-icon-bg);
  }

  .menu:hover,
  .menu:focus,
  .menu:active {
    background-color: var(--c-titlebar-icon-bg--hover);
  }

  :global(.menu-icon) {
    vertical-align: top;
    margin: 0 auto;
  }
</style>

<header>
  <button
    class="menu"
    on:click={() => {
      showSidebar.update((v) => !v)
    }}
  >
    <Icon data={faBars} scale="1" class="menu-icon" />
  </button>
  <h1>
    Hacker News
    {#if isNewsList && $currentStoryType}· {$currentStoryType}{/if}
  </h1>
  <div class="actions">
    <slot />
  </div>
</header>
