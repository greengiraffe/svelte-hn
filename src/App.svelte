<script>
  import ItemPage from "./components/Item/ItemPage.svelte"

  import { Router, Route } from "svelte-routing"

  export let url = ""

  import TitleBar from "./components/TitleBar.svelte"
  import SideBar from "./components/SideBar.svelte"
  import NewsPage from "./components/NewsList/NewsPage.svelte"
  import NotFound from "./components/NotFound.svelte"
</script>

<style lang="scss" global>
  @import "./styles/main";

  main {
    margin-top: 3em; /* TitleBar height */
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
    <Route path="/:storyType" component={NewsPage} />
    <Route path="item/:id" component={ItemPage} />
    <Route path="not-found" component={NotFound} />
  </main>
</Router>
