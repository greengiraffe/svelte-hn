<script>
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
    height: 9.5em;
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
    background-image:
      /* layer 3, line3 */ linear-gradient(
        var(--c-newsitem-meta) 100%,
        transparent 0
      ),
      /* layer 3, line3 */
        linear-gradient(var(--c-newsitem-meta) 100%, transparent 0),
      /* layer 2, line2 */
        linear-gradient(var(--c-newsitem-url) 100%, transparent 0),
      /* layer 2, line1 */
        linear-gradient(var(--c-newsitem-url) 100%, transparent 0),
      /* layer 1, username */
        linear-gradient(var(--c-newsitem-title) 100%, transparent 0);
    background-size: 7em 1em, calc(75% - 1em) 1em, calc(90% - 1em) 1em,
      calc(95% - 1em) 1em, 9em 1em;
    background-position: 1em 7.5em, 1em 5.5em, 1em 4.25em, 1em 3em, 1em 1em;
    animation: loading 1s ease infinite alternate;
    animation-delay: var(--delay);
    opacity: 0.65;
  }
</style>

<div
  class="skeleton"
  style="--delay: {0.1 * index}s;"
  out:fade={{ duration: 50, delay: 10 * index }}
/>
