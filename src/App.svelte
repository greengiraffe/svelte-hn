<script>
  import { onMount } from "svelte"
  import { get, set } from "idb-keyval"
  import { Router, Route } from "svelte-navigator"
  export let url = ""

  import TitleBar from "./components/TitleBar.svelte"
  import SideBar from "./components/SideBar.svelte"
  import NewsPage from "./components/NewsList/NewsPage.svelte"
  import ItemPage from "./components/Item/ItemPage.svelte"
  import NotFound from "./components/NotFound.svelte"
  import SavedItemsPage from "./components/SavedItems/SavedItemsPage.svelte"

  import { savedStories } from "./store"

  onMount(() => {
    // 1. load saved stories from IndexedDB (idb-keyval)
    get("savedStories").then((stories) => {
      if (stories) savedStories.set(stories)
    })
    // 2. keep IndexedDB up to date by subscribing to changes of
    // the savedStories svelte store
    savedStories.subscribe((val) => {
      set("savedStories", val)
    })
  })
</script>

<style lang="scss" global>
  @import "./styles/main";

  main {
    padding-top: 3em; /* TitleBar height */
    position: relative;
    width: 100%;
    height: calc(100% - 3em);
  }
</style>

<Router {url}>
  <TitleBar />
  <main>
    <SideBar />
    <Route path="/" component={NewsPage} storyType="top" />
    <Route path="/saved" component={SavedItemsPage} />
    <Route path="/:storyType" component={NewsPage} />
    <Route path="/item/:id" component={ItemPage} />
    <Route path="/not-found" component={NotFound} />
  </main>
</Router>
