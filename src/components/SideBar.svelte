<script>
  import { Link } from "svelte-routing"
  import { fade } from "svelte/transition"
  import Icon from "svelte-awesome"
  import {
    faQuestion,
    faStar,
    faMedal,
    faCertificate,
    faHandPointRight,
    faBriefcase,
  } from "@fortawesome/free-solid-svg-icons"
  import { slide } from "../transitions"
  import { showSidebar, darkMode } from "../store"

  // disable scrolling when sidebar is shown
  $: document.body.style.overflow = $showSidebar ? "hidden" : "unset"

  // toggle dark mode
  $: $darkMode
    ? document.body.classList.add("dark")
    : document.body.classList.remove("dark")

  // used to pass props from svelte-routing Link component
  // to the underlying <a> element.
  // TODO refactor into NavLink component
  function getProps({ location, href, isPartiallyCurrent, isCurrent }) {
    const isActive = isCurrent

    // The object returned here is spread on the anchor element's attributes
    if (isActive) {
      return { class: "nav-link active" }
    }
    return {
      class: "nav-link",
    }
  }
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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 50vw;
    height: calc(100% - 3em);
    z-index: 3;
    background-color: var(--color-background);
    overflow: hidden;
    padding: 1em;
    font-size: 1em;
    line-height: 1.7;
  }

  nav {
    display: flex;
    flex-direction: column;
    font-weight: 600;
  }

  :global(nav .nav-link) {
    color: var(--color-text);
  }

  :global(nav .nav-link.active) {
    text-decoration: underline;
  }

  nav div {
    display: grid;
    align-items: center;
    grid-template-columns: 1.5em 1fr;
  }

  .settings {
    margin-top: 1em;
  }

  .settings h3 {
    font-size: 1em;
    line-height: 1.7;
    font-weight: 600;
  }
</style>

{#if $showSidebar}
  <div transition:slide class={'sidebar'}>
    <nav>
      <div>
        <Icon data={faStar} />
        <Link to="/top" {getProps} class="nav-link">Top</Link>
      </div>
      <div>
        <Icon data={faCertificate} />
        <Link to="/new" {getProps}>New</Link>
      </div>
      <div>
        <Icon data={faMedal} />
        <Link to="/best" {getProps}>Best</Link>
      </div>
      <div>
        <Icon data={faQuestion} />
        <Link to="/ask" {getProps}>Ask</Link>
      </div>
      <div>
        <Icon data={faHandPointRight} />
        <Link to="/show" {getProps}>Show</Link>
      </div>
      <div>
        <Icon data={faBriefcase} />
        <Link to="/jobs" {getProps}>Jobs</Link>
      </div>
    </nav>

    <div class="settings">
      <h3>Settings</h3>
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

  </div>
  <div
    transition:fade
    class={'fade-background'}
    on:click={() => {
      showSidebar.set(false)
    }}
  />
{/if}
