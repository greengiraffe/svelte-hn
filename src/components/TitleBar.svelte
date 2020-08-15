<script>
  import Icon from "svelte-awesome"
  import { currentStoryType } from "../store"
  import { faBars } from "@fortawesome/free-solid-svg-icons"
  import { showSidebar } from "../store"
</script>

<style>
  header {
    display: flex;
    background-color: var(--color-appheader-background);
    position: fixed;
    width: 100%;
    height: 3em;
    z-index: 3;
    top: 0;
    left: 0;
  }

  h1 {
    color: var(--color-appheader-text);
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
  }

  :global(.menu-icon) {
    vertical-align: top;
    margin: 0 auto;
    fill: var(--color-appheader-text) !important;
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
    {#if $currentStoryType}· {$currentStoryType}{/if}
  </h1>
</header>
