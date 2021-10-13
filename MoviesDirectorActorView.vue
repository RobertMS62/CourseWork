<template>
    <div class="human">
        <b-row v-if="data.human">
            <b-col >
                <img :src="data.human.picture" />
            </b-col>
            <b-col>
                <p class="name">{{data.human.name}}</p>
                <h2 class="label">Описание</h2>
                <span class="description">
                    {{data.human.description}}
                </span>
                <h2 class="label">Дата рождения</h2>
                <ul>
                    <li>{{data.human.dateOfBirth}}</li>
                </ul>
                <h2 class="label">Пол</h2>
                <ul>
                    <li>{{data.human.floor}}</li>
                </ul>
            </b-col>
            <b-col></b-col>

        </b-row>
        <b-row>
            <h2 class="title-film">Фильмы</h2>
        </b-row>
        <b-row>
            <ItemList :results="data.movies" type="movie" @item-clicked="viewDetailInfo" />
        </b-row>
    </div>
</template>

<script>
    import {
        getMoviesByDirectorOrActor
    } from "@/api/movies"
    import ItemList from "@/components/ItemList";
    import {
        viewDetailMixin
    } from "@/mixins/viewDetailMixin";
    export default {
        name: 'MoviesDirectorActorView',
        mixins: [viewDetailMixin],
        components: {
            ItemList
        },
        data() {
            return {
                data: []
            }
        },
        created() {
            this.load()
        },
        methods: {
            load() {
                getMoviesByDirectorOrActor({
                    id: this.$route.params.id
                }).then((response) => {
                    this.data = response
                }).catch((err) => {
                    alert(err)
                });
            }
        },
    }
</script>

<style lang="scss" scoped>
    .human {
        margin-top: 40px;

        .label {
            margin: 2em 0 0.2em;
            font-family: $font-secondary, sans-serif;
            color: $color-secondary;
            font-size: 1em;
            text-transform: uppercase;
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

        .name {
            color: $color-primary;
            font-size: 30px;
        }

        .title-film {
            margin: 20px;
            color: $color-primary;
        }
    }

    img {
        width: 200px;
        height: auto;
        box-shadow: 0px 1px 5px 0px $poster-shadow;
        box-sizing: border-box;
    }

 
</style>