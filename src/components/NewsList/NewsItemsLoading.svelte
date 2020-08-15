<script>
  import { fade } from "svelte/transition"
</script>

<style>
  @keyframes loading {
    to {
      opacity: 1;
    }
  }

  .wrapper {
    position: absolute;
    z-index: 2;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .skeleton {
    width: 100%;
    height: 4em;
    position: relative;
  }

  .skeleton::after {
    content: "";
    display: block;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    position: absolute;
    border-top: 1px solid var(--color-newsitem-border);
    background-repeat: no-repeat;
    background-image:
      /* layer 3, meta */ linear-gradient(
        #ddd 100%,
        transparent 0
      ),
      /* layer 2, url */ linear-gradient(#eee 100%, transparent 0),
      /* layer 1, title*/ linear-gradient(#ccc 100%, transparent 0),
      /* layer 0, left bar*/ linear-gradient(#eee 100%, transparent 0);
    background-size: 30% 0.8em, 20% 0.8em, 60% 1em, 3em 100%;
    background-position: 3.5em 2.55em, 3.5em 1.5em, 3.5em 0.25em, 0 0;
    animation: loading 1s ease infinite alternate;
    animation-delay: var(--delay);
    opacity: 0.25;
  }
</style>

<!--      -->

<div class="wrapper" in:fade={{ duration: 50 }}>
  {#each Array(30) as _, i}
    <div
      class="skeleton"
      style="--delay: {0.1 * i}s;"
      out:fade={{ duration: 50, delay: 10 * i }}
    />
  {/each}
</div>
