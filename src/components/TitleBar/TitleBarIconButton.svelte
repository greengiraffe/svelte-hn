<script>
  import Icon from "svelte-awesome"

  export let icon
  export let title = ""
  export let style
</script>

<style>
  .button {
    padding: 0.5em 0;
    flex: 0 0 3rem;
    text-align: center;
    display: flex;
    align-items: center;
    border-radius: 0;
    color: var(--c-titlebar-icon);
    background-color: var(--c-titlebar-icon-bg);
  }

  .button:hover,
  .button:focus,
  .button:active {
    background-color: var(--c-titlebar-icon-bg--hover);
  }

  :global(.titlebar-icon) {
    vertical-align: top;
    margin: 0 auto;
  }
</style>

<button class="button" {title} on:click>
  <Icon data={icon} scale="1" class="titlebar-icon" {style} />
</button>
