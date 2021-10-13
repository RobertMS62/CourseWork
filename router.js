import Vue from "vue";
import Router from "vue-router";
import MoviesView from "@/views/MoviesView";
import CollectionsMovie from "@/views/CollectionsMovie";
import MoviesDirectorActorView from "@/views/MoviesDirectorActorView"
import AdminView from "@/views/AdminView";

Vue.use(Router);

export default new Router({
  base: process.env.NODE_ENV === "development" ? "/" : "/movies/",
  routes: [
    {
      path: "/",
      redirect: { name: "movies" }
    },
    {
      path: "/movies-by-director-actor/:id",
      name: "moviesDirectorActor",
      component: MoviesDirectorActorView
    },
    {
      path: "/movies",
      name: "movies",
      component: MoviesView
    },
    {
      path: "/collections",
      name: "collections",
      component: CollectionsMovie
    },
    {
      path: "/admin",
      name: "admin",
      component: AdminView
    },
    {
      path: "/*",
      redirect: { name: "movies" }
    }
  ]
});
