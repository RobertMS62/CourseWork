<template>
  <div class="modal-film">
    <div class="overlay" @click="closeModal"></div>
    <div class="modal_content">
      <div class="item_content clearfix">
        <template v-if="showItemInfo">
          <aside class="poster">
            <figure>
              <img :src="itemInfo.item.picture" />
            </figure>
            <b-row>
              <b-col>
                <ScoreIndicator :score="itemInfo.item.score.kinopoisk" size="62" stroke-width="5"
                  stroke-color="#ff6633" />
                <i>KINOPOISK</i></b-col>
              <b-col>
                <ScoreIndicator :score="itemInfo.item.score.imdb" size="62" stroke-width="5" stroke-color="#ff6633" />
                <i>IMDB</i></b-col>
            </b-row>


          </aside>


          <section class="info">
            <h1>{{ itemInfo.item.name }} ({{itemInfo.item.ageLimit}})</h1>

            <p>{{ itemInfo.item.description}}</p>

            <b-row>
              <b-col>
                <h2 class="label">
                  <font-awesome-icon icon="film" size="1x" class="icon" />&nbsp;
                  ДАТА ВЫХОДА</h2>
                <p>{{ itemInfo.item.releaseDate }}</p>
              </b-col>
              <b-col>
                <h2 class="label">
                  <font-awesome-icon icon="film" size="1x" class="icon" />&nbsp;
                  В РОССИИ</h2>
                <p>{{ itemInfo.item.releaseDateRussia }}</p>
              </b-col>
            </b-row>



            <b-row>
              <b-col>
                <h2 class="label">Жанр</h2>
                <ul>
                  <li v-for="item in itemInfo.item.genres" :key="item._id" >{{item.text}}</li>
                </ul>
              </b-col>
              <b-col>
                <h2 class="label">Страна</h2>
                <ul>
                  <li>{{itemInfo.item.country.text}}</li>
                </ul>
              </b-col>
            </b-row>

            <h2 class="label">Режиссеры</h2>
            <span class="click" v-for="(item, index) in itemInfo.item.directors" :key="item._id" @click="getMovies(item)">{{ item.name }}<span v-if="index != itemInfo.item.directors.length - 1">, </span></span>
            <h2 class="label">Актеры</h2>
            <span class="click" v-for="(item, index) in itemInfo.item.actors" :key="item._id" @click="getMovies(item)">{{ item.name }}<span v-if="index != itemInfo.item.actors.length - 1">, </span></span>


            <b-row>
              <b-col>
                <h2 class="label">
                  <font-awesome-icon icon="coins" size="1x" class="icon" />&nbsp;
                  Бюджет</h2>
                <p>{{ itemInfo.item.budget }}</p>
              </b-col>
              <b-col>
                <h2 class="label">
                  <font-awesome-icon icon="coins" size="1x" class="icon" />&nbsp;
                  Сборы в мире</h2>
                <p>{{ itemInfo.item.money }}</p>
              </b-col>
            </b-row>

            <h2 class="label">
                  <font-awesome-icon icon="clock" size="1x" class="icon" />&nbsp;
                  Продолжительность</h2>
                <p>{{ itemInfo.item.duration }}</p>

            <h2 class="label">
                <font-awesome-icon icon="video" size="1x" class="icon" />&nbsp;
              Трейлер</h2>
            <iframe width="500" height="150" :src="itemInfo.item.trailer" frameborder="0" allowfullscreen></iframe>
            <p class="web" v-if="itemInfo.homepage != null">
              <a :href="itemInfo.homepage">{{ itemInfo.homepage}}</a>
            </p>
          </section>
        </template>
      </div>
      <button title="Close" class="close_modal" @click="closeModal">
        <font-awesome-icon icon="times" transform="shrink-6" size="1x" />
      </button>
    </div>
  </div>
</template>

<script>
  import ScoreIndicator from '@/components/ScoreIndicator';
  import {
    mapState,
  } from 'vuex';

  export default {
    name: 'Modal',
    components: {
      ScoreIndicator
    },
    computed: {
      ...mapState(['itemInfo']),
      showItemInfo() {
        return true;
      },
    },
    methods: {
      closeModal() {
        this.$emit('close-modal');
      },
      getMovies(item){
        this.$emit('close-modal');
        this.$router.push('/movies-by-director-actor/' + item._id)
      },
    }
  };
</script>

<style lang="scss" scoped>
  figure {
    margin: 0 0 1em;
  }

  img {
    width: 100%;
    height: auto;
  }

  h1 {
    margin-top: 0;
    font-size: 2em;
    color: $color-primary;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
  }

  li {
    display: inline;
    padding: 4px;
    margin-right: 5px;

    background-color: $color-tags;
    color: $color-text-secondary;
    font-size: 16px;
  }

  p {
    margin: 0;
    line-height: 1.4;
  }

  button {
    color: $color-text-secondary;
  }

  a {
    display: inline-block;
    color: $color-text-secondary;
    text-decoration: none;
    padding-bottom: 2px;
    border-bottom: 1px dotted $color-text-secondary;

    &:hover {
      color: $color-primary;
    }
  }
  .click{
    &:hover {
      color: $color-primary;
      cursor: pointer;
    }
  }

  .item_content {
    padding: 2em;
  }

  .poster {
    display: block;
    margin-bottom: 2em;
    text-align: center;
  }

  .info {
    display: block;
  }

  .label {
    margin: 2em 0 0.2em;
    font-family: $font-secondary, sans-serif;
    color: $color-secondary;
    font-size: 1em;
    text-transform: uppercase;
  }

  .web a {
    max-width: 90%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .modal-film {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 990;

    .overlay {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 995;
      background: $modal-background-overlay;
    }

    .modal_content {
      z-index: 999;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: $modal-background;
      box-shadow: 0 1px 5px $modal-color-shadow;
      text-align: left;
      border-radius: 4px;
      width: 900px;
      /* This just a default width */
      max-width: 90%;
      max-height: 90%;
      overflow-y: auto;

      .buttons_wrapper {
        padding: 20px;
      }

      &::-webkit-scrollbar {
        border-radius: 10px;
        width: 8px;
      }

      &::-webkit-scrollbar-thumb {
        background: $scrollbar-color-thumb;
        border-radius: 10px;
      }

      &::-webkit-scrollbar-track {
        border-radius: 10px;
        background: $scrollbar-color-track;
      }
    }

    .close_modal {
      position: absolute;
      right: 10px;
      top: 10px;
      cursor: pointer;
      font-size: 18px;
      background: none;
      border: none;
      transition: opacity 0.2s ease;

      &:hover {
        color: $color-primary;
      }
    }
  }

  @include sm {
    .poster {
      float: left;
      margin: 0;
      width: 33%;
      text-align: center
    }

    .info {
      display: block;
      padding-left: 2em;
      margin-left: 33%;
    }
  }
</style>