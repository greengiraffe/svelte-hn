<script>
  import Icon from "svelte-awesome"

  export let icon
  export let text = ""
</script>

<style>
  .titlebar-menu-item {
    border-radius: 0;
    background-color: var(--c-background);
    padding: 1em 1em;
    text-align: left;
  }

  .titlebar-menu-item + .titlebar-menu-item {
    border-top: 1px solid var(--c-border);
  }

  .titlebar-menu-item:hover {
    background-color: var(--c-border);
  }

  span {
    margin-left: 0.5em;
  }

  :global(.titlebar-menu-item .icon) {
    margin-bottom: -1px;
  }
</style>

<button class="titlebar-menu-item" on:click>
  <Icon data={icon} class="icon" />
  <slot>
    <span>{text}</span>
  </slot>
</button>
