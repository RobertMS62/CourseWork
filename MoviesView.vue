<template>
  <div>
    <h2 class="title">
      <font-awesome-icon icon="film" size="1x" />&nbsp;
      Фильмы
    </h2>
    <ItemList :results="movies" type="movie" @item-clicked="viewDetailInfo" />
  </div>
</template>

<script>
  import {
    getMovies
  } from "@/api/movies"
  import ItemList from "@/components/ItemList";
  import {
    viewDetailMixin
  } from "@/mixins/viewDetailMixin";

  export default {
    name: 'MoviesView',
    mixins: [viewDetailMixin],
    components: {
      ItemList
    },
    data() {
      return {
        movies: [],
      };
    },
    computed: {
    },
    created() {
      this.getMovies();
    },
    methods: {
      getMovies(){
        getMovies().then(response => {
          this.movies = response
        })
      }
    }
  };
</script>

<style lang="scss" scoped>
</style>