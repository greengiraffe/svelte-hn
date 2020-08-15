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
    faBookmark,
  } from "@fortawesome/free-solid-svg-icons"
  import NavLink from "./NavLink.svelte"
  import { slide } from "../transitions"
  import { showSidebar, darkMode, savedStoryCount } from "../store"

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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 50vw;
    height: calc(100% - 3em);
    padding: 1em 0;
    z-index: 3;
    background-color: var(--color-background);
    overflow: hidden;
    font-size: 1em;
    line-height: 1.7;
  }

  nav {
    display: flex;
    flex-direction: column;
    font-weight: 600;
  }

  nav div {
    padding: 0 1em;
    display: grid;
    align-items: center;
    grid-template-columns: 1.5em 1fr;
  }

  .section {
    margin-top: 1em;
  }

  .settings {
    padding: 0 1em;
  }

  .settings h3 {
    font-size: 1em;
    line-height: 1.7;
    font-weight: 600;
  }

  .saved-stories-count {
    color: var(--color-grey--medium);
  }
</style>

{#if $showSidebar}
  <div transition:slide class={'sidebar'}>
    <nav>
      <div>
        <Icon data={faStar} />
        <NavLink to="/top">Top</NavLink>
      </div>
      <div>
        <Icon data={faCertificate} />
        <NavLink to="/new">New</NavLink>
      </div>
      <div>
        <Icon data={faMedal} />
        <NavLink to="/best">Best</NavLink>
      </div>
      <div>
        <Icon data={faQuestion} />
        <NavLink to="/ask">Ask</NavLink>
      </div>
      <div>
        <Icon data={faHandPointRight} />
        <NavLink to="/show">Show</NavLink>
      </div>
      <div>
        <Icon data={faBriefcase} />
        <NavLink to="/jobs">Jobs</NavLink>
      </div>

      <div class="section user">
        <Icon data={faBookmark} />
        <NavLink to="/saved">
          Saved Stories
          <span class="saved-stories-count">({$savedStoryCount})</span>
        </NavLink>

      </div>
    </nav>

    <div class="section settings">
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
    class="fade-background"
    on:click={() => {
      showSidebar.set(false)
    }}
  />
{/if}
