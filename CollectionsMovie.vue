<template>
  <div>
    <h2 v-if="isView" class="title">
      <font-awesome-icon icon="tv" transform="shrink-3" size="1x" />&nbsp;
      {{name}}
    </h2>
    <h2 v-else class="title">
      <font-awesome-icon icon="tv" transform="shrink-3" size="1x" />&nbsp;
      Подборки
    </h2>

    <b-row v-if="isView">
      <b-button variant="danger" style="margin-left: 20px; margin-bottom: 20px;" @click="close()">Закрыть подборку</b-button>
      <ItemList :results="movies" type="movie" @item-clicked="viewDetailInfo" />
    </b-row>

    <b-card v-else class="collections overflow-hidden" v-for="(item) in collectionsMovies" :key="item._id" no-body
      style="max-width: 400px;" bg-variant="dark" text-variant="white">
      <b-row no-gutters>
        <b-col md="5">
          <b-card-img :src="item.movies[0].picture" alt="Image" class="rounded-0"></b-card-img>
        </b-col>
        <b-col md="7">
          <b-card-body :title="item.name">
            <b-card-text>
              {{item.movies.length}} Фильма
            </b-card-text>
            <b-button style="margin-top: 80px; width: 190px" @click="view(item)">Смотреть подборку</b-button>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>

  </div>
</template>

<script>
  import {
    getCollectionsMovie,
  } from "@/api/collectionsMovie"
  import ItemList from "@/components/ItemList";
  import {
    viewDetailMixin
  } from "@/mixins/viewDetailMixin";
  export default {
    name: 'Collections',
    mixins: [viewDetailMixin],
    components: {
      ItemList
    },
    data() {
      return {
        collectionsMovies: [],
        isView: false,
        movies: [],
        name: ''
      };
    },
    computed: {},
    created() {
      this.getCollectionsMovie();
    },
    methods: {
      getCollectionsMovie() {
        getCollectionsMovie().then(response => {
          this.collectionsMovies = response
        })
      },
      view(item) {
        this.isView = true
        this.movies = item.movies
        this.name = item.name
      },
      close(){
        this.isView = false
      }
    }
  };
</script>

<style lang="scss" scoped>
  .collections {
    display: inline-block;
    margin: 20px;
  }
</style>