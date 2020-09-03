<script>
  import { Link } from "svelte-navigator"
  import Icon from "svelte-awesome"
  import { hideSidebar } from "../store"

  export let to
  export let classNames = []
  export let icon
  export let text
  export let complementary = false

  // used to pass props from svelte-navigator Link component
  // to the underlying <a> element.
  function getProps({ isCurrent }) {
    const classes = "nav-link " + classNames.join(" ")
    if (isCurrent) {
      return { class: classes + " active" }
    }
    return {
      class: classes,
    }
  }
</script>

<style>
  :global(.nav-link, .nav-link:visited) {
    color: var(--c-sidebar-link);
  }

  :global(.nav-link.active) {
    text-decoration: underline;
  }

  :global(.nav-link) {
    padding: 0.5em 1em;
    display: grid;
    align-items: center;
    grid-template-columns: 1.5em 1fr;
  }

  :global(.nav-link:hover, .nav-link:focus) {
    background-color: var(--c-sidebar-link-bg--hover);
  }

  .link-icon {
    margin-bottom: -1px;
  }

  .link-text {
    margin-left: 0.5em;
  }

  .link-complementary {
    color: var(--c-text--secondary);
  }
</style>

<Link {to} {getProps} on:click={hideSidebar}>
  <span class="link-icon">
    {#if icon}
      <Icon data={icon} />
    {/if}
  </span>
  <span class="link-text">
    {#if text}
      {text}
    {:else}
      <slot />
    {/if}
    {#if complementary}
      <span class="link-complementary">{complementary}</span>
    {/if}
  </span>
</Link>
