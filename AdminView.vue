<template>
    <div v-if="jwt === ''">
        <b-row style="margin-top: 50px">
            <div class="mx-auto" style="width: 200px;">
                <h2>Админ Панель</h2>
            </div>
        </b-row>
        <b-row>
            <b-col></b-col>
            <b-col>
                <b-form style="margin-top: 50px">
                    <b-input-group prepend="Email" class="login">
                        <b-form-input id="inline-form-input-username" v-model="email"></b-form-input>
                    </b-input-group>
                    <b-input-group prepend="Пароль" class="login">
                        <b-form-input id="inline-form-input-password" v-model="password"></b-form-input>
                    </b-input-group>
                    <b-button style="width: 100%; margin-top: 15px;" v-on:click="login">Войти</b-button>
                </b-form>
            </b-col>
            <b-col></b-col>
        </b-row>
    </div>
    <div v-else>
        <b-row>
            <b-tabs content-class="mt-12" class="tabs-edit">
                <b-tab title="Режиссеры и Актеры" active title-link-class="tabs-title">
                    <b-row>
                        <b-col>
                            <div>
                                <b-row>
                                    <b-col>
                                        <h3 class="table-title">Актеры</h3>
                                    </b-col>
                                    <b-col class="table-add">
                                        <b-button class="add-btn" size="sm" v-b-modal.modal-add-actors>Добавить
                                        </b-button>
                                    </b-col>
                                </b-row>
                                <b-table hover :items="actors" :dark="true" :fields="fieldsActorsDirectors">
                                    <template #cell(actions)="row">
                                        <b-button size="sm" @click="deleteActor(row.item, row.index, $event.target)"
                                            class="mr-1">
                                            Удалить
                                        </b-button>
                                    </template>
                                </b-table>
                            </div>
                        </b-col>
                        <b-col>
                            <div>
                                <b-row>
                                    <b-col>
                                        <h3 class="table-title">Режиссеры</h3>
                                    </b-col>
                                    <b-col class="table-add">
                                        <b-button class="add-btn" size="sm" v-b-modal.modal-add-directors>Добавить
                                        </b-button>
                                    </b-col>
                                </b-row>
                                <b-table hover :items="directors" :dark="true" :fields="fieldsActorsDirectors">
                                    <template #cell(actions)="row">
                                        <b-button size="sm" @click="deleteDirector(row.item, row.index, $event.target)"
                                            class="mr-1">
                                            Удалить
                                        </b-button>
                                    </template>
                                </b-table>
                            </div>
                        </b-col>
                    </b-row>
                </b-tab>
                <b-tab title="Жанры">
                    <b-row>
                        <b-col>
                            <h3 class="table-title">Жанры</h3>
                        </b-col>
                        <b-col class="table-add">
                            <b-button class="add-btn" size="sm" v-b-modal.modal-add-ganres>Добавить
                            </b-button>
                        </b-col>
                    </b-row>
                    <b-table hover :items="genres" :dark="true" :fields="fieldsGenresCountries">
                        <template #cell(actions)="row">
                            <b-button size="sm" @click="deleteGenre(row.item, row.index, $event.target)" class="mr-1">
                                Удалить
                            </b-button>
                        </template>
                    </b-table>
                </b-tab>
                <b-tab title="Страны">
                    <b-row>
                        <b-col>
                            <h3 class="table-title">Страны</h3>
                        </b-col>
                        <b-col class="table-add">
                            <b-button class="add-btn" size="sm" v-b-modal.modal-add-countries>Добавить
                            </b-button>
                        </b-col>
                    </b-row>
                    <b-table hover :items="countries" :dark="true" :fields="fieldsGenresCountries">
                        <template #cell(actions)="row">
                            <b-button size="sm" @click="deleteCountry(row.item, row.index, $event.target)" class="mr-1">
                                Удалить
                            </b-button>
                        </template>
                    </b-table>
                </b-tab>
                <b-tab title="Фильмы">
                    <b-row>
                        <b-col>
                            <h3 class="table-title">Фильмы</h3>
                        </b-col>
                        <b-col class="table-add">
                            <b-button class="add-btn" size="sm" v-b-modal.modal-add-movies>Добавить
                            </b-button>
                        </b-col>
                    </b-row>
                    <b-table hover :items="movies" :dark="true" :fields="fieldsMovies">
                        <template #cell(actions)="row">
                            <b-button size="sm" @click="deleteMovie(row.item, row.index, $event.target)" class="mr-1">
                                Удалить
                            </b-button>
                        </template>
                    </b-table>
                </b-tab>
                <b-tab title="Подборки">
                    <b-row>
                        <b-col>
                            <h3 class="table-title">Подборки</h3>
                        </b-col>
                        <b-col class="table-add">
                            <b-button class="add-btn" size="sm" v-b-modal.modal-add-collectionsMovie>Добавить
                            </b-button>
                        </b-col>
                    </b-row>
                    <b-table hover :items="collectionsMovies" :dark="true" :fields="fieldsCollectionsMovies">
                        <template #cell(actions)="row">
                            <b-button size="sm" @click="deleteCollectionMovie(row.item, row.index, $event.target)"
                                class="mr-1">
                                Удалить
                            </b-button>
                        </template>
                    </b-table>
                </b-tab>
            </b-tabs>
        </b-row>



        <b-modal cancel-title="Отменить" id="modal-add-countries" ref="modal" title="Добавление Страны" header-text-variant="white"
            header-bg-variant="dark" body-bg-variant="dark" footer-bg-variant="dark" class="modal-add"
            @ok="addNewCountry">
            <form ref="form">
                <b-input-group prepend="Название">
                    <b-form-input id="inline-form-input-actor-name" v-model="newCountryText"></b-form-input>
                </b-input-group>
            </form>
        </b-modal>
        <b-modal cancel-title="Отменить" id="modal-add-ganres" ref="modal" title="Добавление Жанра" header-text-variant="white"
            header-bg-variant="dark" body-bg-variant="dark" footer-bg-variant="dark" class="modal-add"
            @ok="addNewGenre">
            <form ref="form">
                <b-input-group prepend="Название">
                    <b-form-input id="inline-form-input-actor-name" v-model="newGenreText"></b-form-input>
                </b-input-group>
            </form>
        </b-modal>
        <b-modal cancel-title="Отменить" id="modal-add-actors" ref="modal" title="Добавление Актера" header-text-variant="white"
            header-bg-variant="dark" body-bg-variant="dark" footer-bg-variant="dark" class="modal-add"
            @ok="addNewActor">
            <form ref="form">
                <b-input-group prepend="Имя">
                    <b-form-input id="inline-form-input-actor-name" v-model="newActor.name"></b-form-input>
                </b-input-group>
                <b-input-group prepend="Описание">
                    <b-form-input id="inline-form-input-actor-description" v-model="newActor.description"></b-form-input>
                </b-input-group>
                <b-input-group prepend="Дата рождения">
                    <b-form-input id="inline-form-input-actor-dateOfBirth" v-model="newActor.dateOfBirth"></b-form-input>
                </b-input-group>
                <b-input-group prepend="Пол">
                    <b-form-input id="inline-form-input-actor-floor" v-model="newActor.floor"></b-form-input>
                </b-input-group>
                <b-row>
                    <b-img class="preview-image" fluid style="" :src="newActor.picture" alt=""> </b-img>
                </b-row>
                <b-row>
                    <h6>Фотография</h6>
                </b-row>
                <b-row><input @change="handleImageUploadNewActorPhoto" class="upload-photo-input" type="file"
                        accept="image/*"></b-row>
            </form>
        </b-modal>
        <b-modal cancel-title="Отменить" id="modal-add-directors" ref="modal" title="Добавление Режиссера" header-text-variant="white"
            header-bg-variant="dark" body-bg-variant="dark" footer-bg-variant="dark" class="modal-add"
            @ok="addNewDirector">
            <form ref="form">
                 <b-input-group prepend="Имя">
                    <b-form-input id="inline-form-input-actor-name" v-model="newDirector.name"></b-form-input>
                </b-input-group>
                <b-input-group prepend="Описание">
                    <b-form-input id="inline-form-input-actor-description" v-model="newDirector.description"></b-form-input>
                </b-input-group>
                <b-input-group prepend="Дата рождения">
                    <b-form-input id="inline-form-input-actor-dateOfBirth" v-model="newDirector.dateOfBirth"></b-form-input>
                </b-input-group>
                <b-input-group prepend="Пол">
                    <b-form-input id="inline-form-input-actor-floor" v-model="newDirector.floor"></b-form-input>
                </b-input-group>
                <b-row>
                    <b-img class="preview-image" fluid style="" :src="newDirector.picture" alt=""> </b-img>
                </b-row>
                <b-row>
                    <h6>Фотография</h6>
                </b-row>
                <b-row><input @change="handleImageUploadNewDirectorPhoto" class="upload-photo-input" type="file"
                        accept="image/*"></b-row>
            </form>
        </b-modal>


        <b-modal cancel-title="Отменить" id="modal-add-movies" ref="modal" title="Добавление Фильма" header-text-variant="white"
            header-bg-variant="dark" body-bg-variant="dark" footer-bg-variant="dark" class="modal-add" @ok="addNewMovie"
            size="xl">
            <form ref="form">
                <b-row>
                    <b-col>
                        <b-input-group prepend="Название">
                            <b-form-input id="inline-form-input-movie-name" v-model="newMovie.name"></b-form-input>
                        </b-input-group>
                        <b-input-group prepend="Актер/ы">
                            <b-form-select v-model="newMovie.actors" :options="actors" value-field="_id"
                                text-field="name" multiple></b-form-select>
                        </b-input-group>
                        <b-input-group prepend="Режиссер/ы">
                            <b-form-select v-model="newMovie.directors" :options="directors" value-field="_id"
                                text-field="name" multiple></b-form-select>
                        </b-input-group>
                        <b-input-group prepend="Описание">
                            <b-form-textarea id="textarea" v-model="newMovie.description" placeholder="Описание..."
                                rows="3" max-rows="6"></b-form-textarea>
                        </b-input-group>
                        <b-input-group prepend="Жанр/ы">
                            <b-form-select v-model="newMovie.genres" :options="genres" value-field="_id"
                                text-field="text" multiple>
                            </b-form-select>
                        </b-input-group>
                        <b-input-group prepend="IMDB Рейтинг">
                            <b-form-input v-model="newMovie.score.imdb"></b-form-input>
                        </b-input-group>
                        <b-input-group prepend="KINOPOISK Рейтинг">
                            <b-form-input v-model="newMovie.score.kinopoisk"></b-form-input>
                        </b-input-group>
                    </b-col>
                    <b-col>
                        <b-input-group prepend="Дата выхода в мире">
                            <b-form-input v-model="newMovie.releaseDate"></b-form-input>
                        </b-input-group>
                        <b-input-group prepend="Дата выхода в России">
                            <b-form-input v-model="newMovie.releaseDateRussia"></b-form-input>
                        </b-input-group>
                        <b-input-group prepend="Бюджет">
                            <b-form-input v-model="newMovie.budget"></b-form-input>
                        </b-input-group>
                        <b-input-group prepend="Сборы">
                            <b-form-input v-model="newMovie.money"></b-form-input>
                        </b-input-group>
                        <b-input-group prepend="Страна">
                            <b-form-select v-model="newMovie.country" :options="countries" value-field="_id"
                                text-field="text">
                            </b-form-select>
                        </b-input-group>
                        <b-input-group prepend="Возрастное ограничение">
                            <b-form-input v-model="newMovie.ageLimit"></b-form-input>
                        </b-input-group>
                        <b-input-group prepend="Продолжительность">
                            <b-form-input v-model="newMovie.duration"></b-form-input>
                        </b-input-group>
                        <b-input-group prepend="Ссылка на трейлер YouTube">
                            <b-form-input v-model="newMovie.trailer"></b-form-input>
                        </b-input-group>
                        <b-row>
                            <b-img class="preview-image" fluid style="max-width: 50%;" :src="newMovie.picture" alt="">
                            </b-img>
                        </b-row>
                        <b-row>
                            <h6>Фотография</h6>
                        </b-row>
                        <b-row><input @change="handleImageUploadNewMoviePhoto" class="upload-photo-input" type="file"
                                accept="image/*"></b-row>
                    </b-col>
                </b-row>

            </form>
        </b-modal>
        <b-modal cancel-title="Отменить" id="modal-add-collectionsMovie" ref="modal" title="Создание подборки" header-text-variant="white"
            header-bg-variant="dark" body-bg-variant="dark" footer-bg-variant="dark" class="modal-add"
            @ok="addNewCollectionsMovie">
            <form ref="form">
                <b-input-group prepend="Название подборки">
                    <b-form-input id="inline-form-input-actor-name" v-model="newCollectionsMovie.name"></b-form-input>
                </b-input-group>
                <b-input-group prepend="Фильм/ы">
                    <b-form-select v-model="newCollectionsMovie.movies" :options="movies" value-field="_id"
                        text-field="name" multiple>
                    </b-form-select>
                </b-input-group>
            </form>
        </b-modal>



    </div>
</template>

<script>
    import {
        addNewMovie,
        getMovies,
        deleteMovie
    } from "@/api/movies"
    import {
        getCollectionsMovie,
        addNewCollectionsMovie,
        deleteCollectionsMovie
    } from "@/api/collectionsMovie"
    import {
        login,
        getInfo
    } from "@/api/users"
    import {
        getActors,
        addNewActor,
        deleteActor
    } from "@/api/actors"
    import {
        getDirectors,
        addNewDirector,
        deleteDirector
    } from "@/api/directors"
    import {
        getGenres,
        addNewGenre,
        deleteGenre
    } from "@/api/genres"
    import {
        getCountries,
        addNewCountry,
        deleteCountry
    } from "@/api/countries"
    export default {
        data() {
            return {
                email: 'robert@mail.com',
                password: 'robert228',
                jwt: '',
                profile: '',
                actors: [],
                fieldsActorsDirectors: [{
                        key: 'name',
                        label: 'Имя'
                    },
                    {
                        key: 'dateOfBirth',
                        label: 'Дата рождения'
                    },
                    {
                        key: 'floor',
                        label: 'Пол'
                    },
                    {
                        key: 'actions',
                        label: 'Действие',
                        class: 'actions'
                    }
                ],
                fieldsGenresCountries: [{
                        key: 'text',
                        label: 'Название'
                    },
                    {
                        key: 'actions',
                        label: 'Действие',
                        class: 'actions'
                    }

                ],
                fieldsCollectionsMovies: [{
                        key: 'name',
                        label: 'Название'
                    },
                    {
                        key: 'actions',
                        label: 'Действие',
                        class: 'actions'
                    }

                ],
                fieldsMovies: [{
                        key: 'name',
                        label: 'Название'
                    },
                    {
                        key: 'releaseDate',
                        label: 'Дата выхода'
                    },
                    {
                        key: 'actions',
                        label: 'Действие',
                        class: 'actions'
                    }

                ],
                directors: [],
                newActor: {
                    name: '',
                    dateOfBirth: '',
                    description: '',
                    floor: '',
                    picture: null,
                },
                newDirector: {
                    name: '',
                    dateOfBirth: '',
                    description: '',
                    floor: '',
                    picture: null,
                },
                genres: [],
                newGenreText: "",
                countries: [],
                newCountryText: "",
                movies: [],
                newMovie: {
                    name: '',
                    actors: [],
                    directors: [],
                    description: '',
                    picture: null,
                    genres: [],
                    score: {
                        imdb: '',
                        kinopoisk: '',
                    },
                    releaseDate: '',
                    money: '',
                    country: '',
                    ageLimit: '',
                    duration: '',
                    budget: '',
                    releaseDateRussia: '',
                    trailer: ''
                },
                collectionsMovies: [],
                newCollectionsMovie: {
                    name: '',
                    movies: []
                }

            }
        },
        methods: {
            deleteActor(item) {
                this.$bvModal.msgBoxConfirm('Вы действительно хотите удалить актера?', {
                        cancelTitle: 'Отменить', okVariant: 'danger'
                    })
                    .then(value => {
                        if (!value) return;
                        deleteActor({
                            jwt: this.jwt,
                            id: item._id
                        }).then(() => {
                            this.actors = this.actors.filter(actor => {
                                return actor._id !== item._id
                            })
                        })
                    })

            },
            deleteDirector(item) {
                this.$bvModal.msgBoxConfirm('Вы действительно хотите удалить режиссера?', {
                        cancelTitle: 'Отменить', okVariant: 'danger'
                    })
                    .then(value => {
                        if (!value) return;
                        deleteDirector({
                            jwt: this.jwt,
                            id: item._id
                        }).then(() => {
                            this.directors = this.directors.filter(actor => {
                                return actor._id !== item._id
                            })
                        })
                    })

            },
            deleteGenre(item) {
                this.$bvModal.msgBoxConfirm('Вы действительно хотите удалить жанр?', {
                        cancelTitle: 'Отменить', okVariant: 'danger'
                    })
                    .then(value => {
                        if (!value) return;
                        deleteGenre({
                            jwt: this.jwt,
                            id: item._id
                        }).then(() => {
                            this.genres = this.genres.filter(genre => {
                                return genre._id !== item._id
                            })
                        })
                    })

            },
            deleteCountry(item) {
                this.$bvModal.msgBoxConfirm('Вы действительно хотите удалить страну?', {
                        cancelTitle: 'Отменить', okVariant: 'danger',
                    })
                    .then(value => {
                        if (!value) return;
                        deleteCountry({
                            jwt: this.jwt,
                            id: item._id
                        }).then(() => {
                            this.countries = this.countries.filter(country => {
                                return country._id !== item._id
                            })
                        })
                    })
            },
            deleteMovie(item) {
                this.$bvModal.msgBoxConfirm('Вы действительно хотите удалить фильм?', {
                        cancelTitle: 'Отменить', okVariant: 'danger'
                    })
                    .then(value => {
                        if (!value) return;
                        deleteMovie({
                            jwt: this.jwt,
                            id: item._id
                        }).then(() => {
                            this.movies = this.movies.filter(movie => {
                                return movie._id !== item._id
                            })
                        })
                    })
            },
            deleteCollectionMovie(item) {
                this.$bvModal.msgBoxConfirm('Вы действительно хотите удалить эту подборку?', {
                        cancelTitle: 'Отменить', okVariant: 'danger'
                    })
                    .then(value => {
                        if (!value) return;
                        deleteCollectionsMovie({
                            jwt: this.jwt,
                            id: item._id
                        }).then(() => {
                            this.collectionsMovies = this.collectionsMovies.filter(collectionsMovie => {
                                return collectionsMovie._id !== item._id
                            })
                        })
                    })
            },
            addNewMovie() {
                this.newMovie.jwt = this.jwt
                addNewMovie(this.newMovie).then(response => {
                    this.movies.push(response)
                }).catch((err) => {
                    alert(err)
                })
            },
            addNewActor() {
                this.newActor.jwt = this.jwt
                addNewActor(this.newActor).then(response => {
                    this.actors.push(response)
                }).catch((err) => {
                    alert(err)
                })
            },
            addNewDirector() {
                this.newDirector.jwt = this.jwt
                addNewDirector(this.newDirector).then(response => {
                    this.directors.push(response)
                }).catch((err) => {
                    alert(err)
                })
            },
            addNewGenre() {
                addNewGenre({
                    jwt: this.jwt,
                    text: this.newGenreText
                }).then(response => {
                    this.genres.push(response)
                    this.newGenreText = ""
                }).catch(err => {
                    alert(err)
                })
            },
            addNewCountry() {
                addNewCountry({
                    jwt: this.jwt,
                    text: this.newCountryText
                }).then(response => {
                    this.countries.push(response)
                }).catch(err => {
                    alert(err)
                })
            },
            addNewCollectionsMovie() {
                addNewCollectionsMovie({
                    jwt: this.jwt,
                    name: this.newCollectionsMovie.name,
                    movies: this.newCollectionsMovie.movies
                }).then(response => {
                    this.collectionsMovies.push(response)
                })
            },
            handleImageUploadNewMoviePhoto(e) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.newMovie.picture = e.target.result;
                };
                reader.readAsDataURL(e.target.files[0]);
            },
            handleImageUploadNewActorPhoto(e) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.newActor.picture = e.target.result;
                };
                reader.readAsDataURL(e.target.files[0]);
            },
            handleImageUploadNewDirectorPhoto(e) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.newDirector.picture = e.target.result;
                };
                reader.readAsDataURL(e.target.files[0]);
                PageTransitionEvent
            },
            loadData() {
                getActors({
                    jwt: this.jwt
                }).then(response => {
                    this.actors = response
                })
                getDirectors({
                    jwt: this.jwt
                }).then(response => {
                    this.directors = response
                })
                getGenres({
                    jwt: this.jwt
                }).then(response => {
                    this.genres = response
                })
                getCountries({
                    jwt: this.jwt
                }).then(response => {
                    this.countries = response
                })
                getMovies({
                    jwt: this.jwt
                }).then(response => {
                    this.movies = response
                })
                getCollectionsMovie().then(response => {
                    this.collectionsMovies = response
                })
            },
            login() {
                login({
                    email: this.email,
                    password: this.password
                }).then(response => {
                    this.jwt = response.token
                    getInfo({
                        jwt: this.jwt
                    }).then(response => {
                        this.profile = response
                        this.loadData()
                    })
                }).catch(() => {
                    alert('Неправильный Email или пароль')
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
    .tabs-edit {
        width: 100%;
        margin: 40px;
    }

    s .login {
        margin-bottom: 15px;
    }

    h6 {
        margin-left: 20px;
        color: white;
    }

    .upload-photo-input {
        margin-left: 20px;
        color: white;
    }
</style>

<style>
    .preview-image {
        padding: 20px;
    }

    .img-fluid {
        max-width: 50%;
    }

    .nav-tabs>li.active>a {
        color: #ff6633;
        font-size: 16px;
    }

    .nav-tabs>li>a {
        color: #ff6633;
    }

    .table-title {
        margin: 10px;
    }

    .table-add {
        text-align: right;
        padding-top: 15px;
    }

    .table {
        margin-top: 10px;
    }

    .actions {
        width: 100px !important;
    }

    .modal-footer {
        margin-top: 0px;
    }

    .input-group {
        margin-top: 15px;
    }
</style>