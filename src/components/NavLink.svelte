<script>
  import { Link } from "svelte-routing"

  export let to
  export let classNames = []
  export let activeClass = "active"

  // used to pass props from svelte-routing Link component
  // to the underlying <a> element.
  function getProps({ location, href, isPartiallyCurrent, isCurrent }) {
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
    color: var(--c-sidebar-link--hover);
    text-decoration: underline;
  }
</style>

<Link {to} {getProps}>
  <slot />
</Link>
