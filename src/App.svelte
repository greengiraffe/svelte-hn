<script>
  import ItemPage from "./components/Item/ItemPage.svelte"

  import { Router, Route } from "svelte-routing"

  export let url = ""

  import TitleBar from "./components/TitleBar.svelte"
  import SideBar from "./components/SideBar.svelte"
  import NewsPage from "./components/NewsList/NewsPage.svelte"
</script>

<style lang="scss" global>
  @import "./styles/main";

  main {
    position: relative;
  }
</style>

<Router {url}>
  <main>
    <TitleBar />
    <SideBar />
    <Route path="/" component={NewsPage} />
    <Route path="item/:id" component={ItemPage} />
  </main>
</Router>
