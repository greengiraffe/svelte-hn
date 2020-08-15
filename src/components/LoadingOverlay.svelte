<script>
  import { fade } from "svelte/transition"
  import Icon from "svelte-awesome"
  import { faSpinner } from "@fortawesome/free-solid-svg-icons"
</script>

<style>
  .loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    z-index: 2;
    background-color: var(--color-background);
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .loading p {
    margin: 1em 0 3em;
  }
</style>

<div class="loading" in:fade={{ duration: 50 }} out:fade={{ duration: 150 }}>
  <Icon data={faSpinner} scale={2} spin />
  <p>Loading</p>
</div>
