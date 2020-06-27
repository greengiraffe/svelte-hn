<script>
  import { fade } from "svelte/transition"
  import { slide } from "../transitions"
  import { showSidebar } from "../store"

  // disable scrolling when sidebar is shown
  $: document.body.style.overflow = $showSidebar ? "hidden" : "unset"
</script>

<style>
  .fade-background {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 2;
    transition: opacity 0.3s ease-in;
    background-color: var(--color-overlay);
  }

  .sidebar {
    position: fixed;
    width: 50vw;
    height: 100%;
    z-index: 3;
    background-color: var(--color-background);
    overflow: hidden;
  }
</style>

{#if $showSidebar}
  <div transition:slide class={'sidebar'}>Hello sidebar</div>
  <div
    transition:fade
    class={'fade-background'}
    on:click={() => {
      showSidebar.set(false)
    }}
  />
{/if}
