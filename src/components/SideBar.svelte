<script>
  import { fade } from "svelte/transition"
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
  import {
    sidebarVisible,
    hideSidebar,
    theme,
    bookmarkedStoryCount,
    expandAllComments,
    downloadBookmarks
  } from "../store"

  function updateTheme(e) {
    if (e.target.checked) {
      theme.set("dark")
    } else {
      theme.set("light")
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
    background-color: var(--c-sidebar-overlay);
  }

  .sidebar {
    position: fixed;
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 15em;
    max-width: 20vw;
    height: calc(100% - 3em);
    margin-top: 3em;
    z-index: 3;
    background-color: var(--c-sidebar-bg);
    overflow: hidden;
    font-size: 1em;
    line-height: 1.7;
  }

  nav {
    display: flex;
    flex-direction: column;
    font-weight: 600;
    margin-top: 1em;
  }

  .section {
    margin-top: 1em;
  }

  .settings {
    padding: 0 1em;
    margin-top: auto;
  }

  .settings h3 {
    font-size: 1em;
    line-height: 1.7;
    font-weight: 600;
  }

  .settings ul {
    margin: 0;
    padding: 0;
  }

  .settings li {
    list-style-type: none;
  }

  .info {
    border-top: 1px solid var(--c-border);
    font-size: 0.8em;
    padding: 0.5em 1em;
  }
</style>

{#if $sidebarVisible}
  <div transition:slide class={'sidebar'}>
    <nav>
      <NavLink to="/top" icon={faStar} text="Top" />
      <NavLink to="/new" icon={faCertificate} text="New" />
      <NavLink to="/best" icon={faMedal} text="Best" />
      <NavLink to="/ask" icon={faQuestion} text="Ask" />
      <NavLink to="/show" icon={faHandPointRight} text="Show" />
      <NavLink to="/jobs" icon={faBriefcase} text="Jobs" />

      <div class="section user">
        <NavLink
          to="/bookmarks"
          icon={faBookmark}
          text="Bookmarks"
          complementary="({$bookmarkedStoryCount})"
        />
      </div>
    </nav>

    <div class="section settings">
      <h3>Settings</h3>
      <ul>
        <li>
          <label>
            <input
              type="checkbox"
              checked={$theme === 'dark'}
              on:click={updateTheme}
            />
            Dark Mode
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              checked={$expandAllComments}
              on:click={() => {
                expandAllComments.update((v) => !v)
              }}
            />
            Expand all comments
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              checked={$downloadBookmarks}
              on:click={() => {
                downloadBookmarks.update((v) => !v)
              }}
            />
            Download Bookmarks
          </label>
        </li>
      </ul>
    </div>

    <div class="section info">
      <div>
        Svelte HN on
        <a href="https://github.com/greengiraffe/svelte-hn">GitHub</a>
      </div>
    </div>

  </div>
  <div transition:fade class="fade-background" on:click={hideSidebar} />
{/if}
