<script>
  import { quadInOut, sineOut } from "svelte/easing"

  import { fade } from "svelte/transition"

  export let index = 0
</script>

<style>
  @keyframes loading {
    to {
      opacity: 0.15;
    }
  }

  .skeleton {
    width: 100%;
    height: 4em;
    position: relative;
    background-color: var(--c-background);
  }

  .skeleton::after {
    content: "";
    display: block;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    position: absolute;
    border-top: 1px solid var(--c-newsitem-border);
    background-repeat: no-repeat;
    background-image: linear-gradient(
        var(--c-newsitem-meta) 100%,
        transparent 0
      ),
      linear-gradient(var(--c-newsitem-url) 100%, transparent 0),
      linear-gradient(var(--c-newsitem-title) 100%, transparent 0),
      linear-gradient(var(--c-newsitem-side-bg) 100%, transparent 0);
    background-size: 30% 0.8em, 20% 0.8em, 60% 1em, 3em 100%;
    background-position: 3.5em 2.55em, 3.5em 1.5em, 3.5em 0.25em, 0 0;
    animation: loading 1s ease infinite alternate;
    animation-delay: var(--delay);
    opacity: 0.65;
  }
</style>

<div
  class="skeleton"
  style="--delay: {0.1 * index}s;"
  out:fade={{ duration: 200, delay: 10 * index, easing: quadInOut }}
/>
