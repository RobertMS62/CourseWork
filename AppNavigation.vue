<template>
  <div class="navigation">
    <ul>
      <li v-for="(link, index) in links" :key="index">
        <router-link :to="link.url">
          <font-awesome-icon :icon="link.icon" :transform="link.transform" size="2x" class="icon" />
          <br />
          <span>{{ link.text }}</span>
        </router-link>
      </li>
      <li class="title-top">FILMOGRAPHY</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'AppNavigation',
    components: {},
    data() {
      return {
        links: [{
            url: '/movies',
            text: 'Фильмы',
            icon: 'film',
            transform: 'shrink-6'
          },
          {
            url: '/collections',
            text: 'Подборки',
            icon: 'tv',
            transform: 'shrink-8'
          }
        ]
      };
    }
  };
</script>

<style lang="scss" scoped>
  .title-top {
    height: 60px;
    width: calc(100% - 95px);
    text-align: center;
    color: $color-primary;
    padding: 5px;
    font-size: 30px;
    font-weight: bold;
    letter-spacing: 20px;
  }

  ul {
    margin: 0;
    padding: 0;
    display: flex;
  }

  li {
    height: 60px;
    width: 50px;
    border-left: 1px solid $background-border;
    list-style: none;
    display: inline-block;
    box-sizing: border-box;

    &:last-child {
      flex-grow: 1;
      border-right: 1px solid $background-border;
    }
  }

  a {
    display: block;
    height: 100%;
    text-align: center;
    color: $color-text-primary;
    text-decoration: none;

    &:hover {
      color: $color-text-secondary;
    }

    &.router-link-active {
      background: $background-active;
      background: radial-gradient(circle,
          $background-active-gradient1,
          $background-active-gradient2);
      color: $color-text-secondary;
    }
  }

  span {
    display: none;
  }

  .navigation {
    margin: 0 auto;
    max-width: 1000px;
  }

  .icon {
    margin-top: 15px;
  }

  @include sm {
    li {
      width: 85px;
    }

    span {
      display: inline;
      padding: 0 10px;
    }

    .icon {
      margin-top: 3px;
    }
  }
</style>