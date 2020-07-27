<script>
  import { createEventDispatcher, onMount } from "svelte"

  const dispatch = createEventDispatcher()
  const transitionDuration = 300
  const minDrag = 5

  let itemEl // references div
  let maxDrag, dragRatio
  let start = 0
  let dragging = false
  let diff = 0
  let dragDirection

  // Reactive properties
  $: actionOpacity = Math.min(0.25 + Math.abs(diff) / maxDrag, 1)
  $: contentStyle = `
		transform: translate3d(${diff}px,0,0);
		transition: transform ${
      dragging ? 0 : transitionDuration * dragRatio
    }ms ease-out;
	`
  $: actionsStyle = `
		opacity: ${actionOpacity};
		transition: opacity ${dragging ? 0 : transitionDuration * dragRatio}ms ease-out;
	`

  onMount(() => {
    maxDrag = Math.max(Math.min(itemEl.offsetWidth / 3, 150), 50)
  })

  function handleDragStart(e) {
    e.target.setPointerCapture(e.pointerId)
    dragging = true
    start = e.clientX
  }

  function handleDragEnd(e) {
    // TODO releasePointerCapture throws an error in (at least) Firefox
    // e.target.releasePointerCapture(e.pointerId)
    dragging = false
    start = 0
    dragRatio = Math.max(Math.abs(diff) / maxDrag, 0.5)
    if (Math.abs(diff) >= maxDrag) {
      setTimeout(() => {
        if (dragDirection === "left") {
          dispatch("action-right")
        }
        if (dragDirection === "right") {
          dispatch("action-left")
        }
      }, transitionDuration)
    }
    diff = 0
  }

  function handleMove(e) {
    if (!dragging) return
    const newDiff = e.clientX - start
    if (Math.abs(newDiff) < minDrag) {
      return
    }
    if (Math.abs(newDiff) > maxDrag) {
      diff = Math.sign(newDiff) * maxDrag
    } else {
      diff = newDiff
    }
    dragDirection = diff < 0 ? "left" : "right"
  }
</script>

<style>
  .sta-wrapper {
    position: relative;
    overflow: hidden;
    background: inherit;
  }

  .sta-wrapper div {
    width: 100%;
    background: inherit;
  }

  .sta-content {
    z-index: 1;
    width: auto;
    touch-action: pan-y;
  }

  .sta-actions {
    height: 100%;
    width: 100%;
    vertical-align: center;
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .sta-actions > div {
    height: 100%;
  }

  .sta-left {
    text-align: left;
  }

  .sta-right {
    text-align: right;
  }
</style>

{#if false}
  <!--
  to avoid svelte warning: "<SwipeToAction> received an unexpected slot "default"."
  see https://github.com/sveltejs/svelte/issues/4546
-->
  <slot />
{/if}

<div class="sta-wrapper">
  <div class="sta-actions" style={actionsStyle}>
    <div class="sta-left">
      <slot name="action-left" />
    </div>
    <div class="sta-right">
      <slot name="action-right" />
    </div>
  </div>
  <div
    class="sta-content"
    bind:this={itemEl}
    on:pointerdown={handleDragStart}
    on:pointermove={handleMove}
    on:pointerup={handleDragEnd}
    on:pointercancel={handleDragEnd}
    style={contentStyle}
  >
    <slot name="content" />
  </div>
</div>
