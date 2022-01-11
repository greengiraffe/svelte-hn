<script>
  import { faBars } from "@fortawesome/free-solid-svg-icons"
  import { link } from "svelte-navigator"
  import { toggleSidebar } from "../../store"
  import TitleBarIconButton from "./TitleBarIconButton.svelte"
  import SideBar from "../SideBar.svelte"

  export let isPrimaryHeading = false
  export let text

  $: title = "Hacker News" + (text ? ` · ${text}` : "")
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

  .title {
    color: var(--c-titlebar-text);
    display: inline;
    font-size: 1em;
    line-height: 2;
    flex: 1;
    padding: 0.5em 0.5em;
  }

  .title a {
    color: var(--c-titlebar-text);
  }
</style>

<header>
  <TitleBarIconButton icon={faBars} on:click={toggleSidebar} title="Menu"/>
  <SideBar />
  {#if isPrimaryHeading}
    <h1 class="title">
      <a href="/top" use:link>{title}</a>
    </h1>
  {:else}
    <h2 class="title">
      <a href="/top" use:link>{title}</a>
    </h2>
  {/if}
  <slot />
</header>
