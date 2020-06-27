<script>
  import Icon from "svelte-awesome"
  import { faBars } from "@fortawesome/free-solid-svg-icons"
  import { showSidebar } from "../store"
</script>

<style>
  div {
    display: flex;
    background-color: var(--color-appheader-background);
    position: sticky;
    z-index: 2;
    top: 0;
    left: 0;
  }

  h1 {
    color: var(--color-appheader-text);
    display: inline;
    font-size: 1em;
    line-height: 2.4;
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

<div>
  <button
    class="menu"
    on:click={() => {
      showSidebar.update((v) => !v)
    }}
  >
    <Icon data={faBars} scale="1" class="menu-icon" />
  </button>
  <h1>Hacker News</h1>
</div>
