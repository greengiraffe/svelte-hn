<script>
  import { onMount, onDestroy } from "svelte"
  import { Router, Route } from "svelte-navigator"
  export let url = ""

  import SideBar from "./components/SideBar.svelte"
  import NewsPage from "./components/NewsList/NewsPage.svelte"
  import ItemPage from "./components/Item/ItemPage.svelte"
  import NotFoundPage from "./components/NotFoundPage.svelte"
  import BookmarkPage from "./components/Bookmarks/BookmarkPage.svelte"

  import { scrollY } from "./store"
  import { subscribeStoresFromIDB, initStoresFromIDB } from "./helper/idbHelper"

  let unsubscribeIDBStores

  onMount(() => {
    initStoresFromIDB()
    unsubscribeIDBStores = subscribeStoresFromIDB()
  })

  onDestroy(() => {
    unsubscribeIDBStores()
  })
</script>

<style lang="scss" global>
  @import "./styles/main";

  main {
    padding-top: 3em; /* TitleBar height */
    position: relative;
    width: 100%;
    height: calc(100% - 3em);
    overflow-anchor: none; /* Prevents scroll-anchoring (https://stackoverflow.com/q/42205462) */
  }
</style>

<svelte:window bind:scrollY={$scrollY} />

<Router {url} primary={false}>
  <SideBar />
  <Route path="/" component={NewsPage} storyType="top" />
  <Route path="/:storyType" component={NewsPage} />
  <Route path="/bookmarks" component={BookmarkPage} />
  <Route path="/item" component={ItemPage} />
  <Route path="/not-found" component={NotFoundPage} />
</Router>
