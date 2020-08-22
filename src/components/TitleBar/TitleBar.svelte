<script>
  import { faBars } from "@fortawesome/free-solid-svg-icons"
  import { currentStoryType, showSidebar } from "../../store"
  import { validStoryType } from "../../api/storyTypes"
  import { beforeUpdate } from "svelte"
  import TitleBarIconButton from "./TitleBarIconButton.svelte"

  let isNewsList = true

  beforeUpdate(() => {
    const path = location.pathname.slice(1, location.pathname.length)
    isNewsList = path.length === 0 || validStoryType(path)
  })

  function toggleSidebar() {
    showSidebar.update((v) => !v)
  }
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
</style>

<header>
  <TitleBarIconButton icon={faBars} on:click={toggleSidebar} />
  <h1>
    Hacker News
    {#if isNewsList && $currentStoryType}· {$currentStoryType}{/if}
  </h1>
  <slot />
</header>
