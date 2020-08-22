<script>
  import { fade } from "svelte/transition"
  import TitleBarIconButton from "./TitleBarIconButton.svelte"
  import { faEllipsisV } from "@fortawesome/free-solid-svg-icons"
  import { afterUpdate, onDestroy } from "svelte"

  let showMenu = false
  let menuElement

  afterUpdate(() => {
    if (showMenu) {
      document.addEventListener("click", handleClick, { capture: true })
    } else {
      document.removeEventListener("click", handleClick, { capture: true })
    }
  })

  onDestroy(() => {
    document.removeEventListener("click", handleClick, { capture: true })
  })

  function handleClick(event) {
    const { target } = event
    if (target !== menuElement && !menuElement.contains(target)) {
      showMenu = false
    }
  }

  function toggleMenu(event) {
    event.preventDefault()
    showMenu = !showMenu
  }
</script>

<style>
  .menu {
    position: absolute;
    right: 0.5em;
    top: 3.5em;
    display: flex;
    flex-direction: column;
    border: 1px solid var(--c-border);
    box-shadow: -4px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }
</style>

<TitleBarIconButton
  icon={faEllipsisV}
  title="Show actions"
  on:click={toggleMenu}
/>
{#if showMenu}
  <div
    bind:this={menuElement}
    class="menu"
    in:fade={{ duration: 150 }}
    out:fade={{ duration: 150 }}
  >
    <slot />
  </div>
{/if}
