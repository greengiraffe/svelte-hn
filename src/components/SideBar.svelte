<script>
  import { links } from "svelte-routing"
  import { fade } from "svelte/transition"
  import { slide } from "../transitions"
  import { showSidebar, darkMode } from "../store"

  // disable scrolling when sidebar is shown
  $: document.body.style.overflow = $showSidebar ? "hidden" : "unset"

  // toggle dark mode
  $: $darkMode
    ? document.body.classList.add("dark")
    : document.body.classList.remove("dark")
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
    padding: 1em;
  }

  nav {
    display: flex;
    flex-direction: column;
  }
</style>

{#if $showSidebar}
  <div transition:slide class={'sidebar'}>
    <nav use:links>
      <a href="/top">Top</a>
      <a href="/new">New</a>
      <a href="/best">Best</a>
      <a href="/ask">Ask</a>
      <a href="/show">Show</a>
      <a href="/jobs">Jobs</a>
    </nav>

    <label>
      <input
        type="checkbox"
        checked={$darkMode}
        on:click={() => {
          darkMode.update((v) => !v)
        }}
      />
      Dark Mode
    </label>

  </div>
  <div
    transition:fade
    class={'fade-background'}
    on:click={() => {
      showSidebar.set(false)
    }}
  />
{/if}
