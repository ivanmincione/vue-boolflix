const urlApiKey = "https://api.themoviedb.org/3/";
const myApiKey = "2d2a4a44dc798710847157dec0ed05f2";

var app = new Vue ({
    el: '#root',
    data: {
        // array contenente i film ricercati
        movies: [],
        // array contenente le SERIE TV ricercate
        series: [],
        // array multi search
        multi: [],
        // array dove concatenare i FILM e le SERIE TV
        arrayMoviesSeries: [],
        // input search
        filterSearch:'',
        // array delle lingue abbinate alle FLAGS
        languageFlag: ['it', 'en', 'es', 'fr', 'de','ja','ru','sk','uk','zh'],
        // variabile per il loading
        loading: false,
        // titolo della ricerca effettuata
        titleSearch:'',
        // url base da concatenare con url di ogni box
        urlPoster: "https://image.tmdb.org/t/p/",
        // url da inserire nel caso il poster di un film sia NULL
        urlNullPoster: "https://www.softwareone.it/public/layout/uploads/2019/05/movavi-video-editor-icona.png",


        // cast:[],

        selected:"",
        typeGenres:[],

    },

    methods: {
        // funzione abbianta al bottone per la ricerca
        btnResearch() {
            if(this.filterSearch.trim() !='') {
                this.loading = true;
                // svuoto il contenitore
                this.arrayMoviesSeries = [];
                let testoRicercato = this.filterSearch;
                // svuoto l'input
                this.filterSearch = '';
                this.titleSearch = testoRicercato;

                // chiamata per recuperare la lista dei FILM
                axios.get( urlApiKey + "search/movie" , {
                    params:{
                        api_key: myApiKey,
                        query: testoRicercato,
                        language: 'it',
                    }
                })
                // assegno i risultati della chiamata all'array dei FILM
                //concateno e assegno il loading ad entrambi i .then perchè essendo chiamate asincrone non sò quale viene restituita per prima
                .then((reply) => {
                    this.movies = reply.data.results;
                    this.arrayMoviesSeries = this.movies.concat(this.series);
                    this.loading = false;

                    // //  test attori
                    // this.arrayMoviesSeries.forEach((movie) => {
                    //    // this.cast= '';
                    //    axios.get('https://api.themoviedb.org/3/movie/' + movie.id + '/credits', {
                    //        params: {
                    //            api_key: myApiKey
                    //        }
                    //    })
                    //    .then((reply) => {
                    //        this.cast = reply.data.cast.slice(0,5)
                    //
                    //
                    //        console.log(this.arrayMoviesSeries);
                    //    });
                    // });


                })

                // chiamata per recuperare la lista delle SERIE TV
                axios.get( urlApiKey + "search/tv" , {
                    params:{
                        api_key: myApiKey,
                        query: testoRicercato,
                        language: 'it',
                    }
                })
                // assegno i risulati ottenuti dalla chiamata all'array SERIE TV
                .then((reply) => {
                    this.series = reply.data.results;
                    // unisco gli array dei FILM e delle SERIE TV
                    this.arrayMoviesSeries = this.movies.concat(this.series);
                    this.loading = false;
                })
            // end if
            }
        // end btn
        },

        // arrotondo il numero del voto
        votation(val) {
            var number = Math.round(parseFloat(val) / 2 );
            return number
        },

        filmRecenti() {
            this.arrayMoviesSeries = [];
            let testoRicercato = this.filterSearch;
            // svuoto l'input e la barra dei titoli della ricerca
            this.filterSearch = '';
            this.titleSearch = testoRicercato;
            axios.get( urlApiKey + "movie/now_playing" , {
                params:{
                    api_key: myApiKey,
                    // query: testoRicercato
                    // query: '',
                    language:'it',
                }
            })
            // assegno i risultati della chiamata all'array dei FILM e SERIE TV uniti
            .then((reply) => {
                this.arrayMoviesSeries = reply.data.results;
            })
        },

        filmPopolari() {
            this.arrayMoviesSeries = [];
            let testoRicercato = this.filterSearch;
            // svuoto l'input e la barra dei titoli della ricerca
            this.filterSearch = '';
            this.titleSearch = testoRicercato;
            axios.get( urlApiKey + "movie/popular" , {
                params:{
                    api_key: myApiKey,
                    // query: testoRicercato
                    query: '',
                    language: 'it',
                }
            })
            // assegno i risultati della chiamata all'array dei FILM e SERIE TV uniti
            .then((reply) => {
                this.arrayMoviesSeries = reply.data.results;
            })
        },

        newSeries() {
            this.arrayMoviesSeries = [];
            let testoRicercato = this.filterSearch;
            // svuoto l'input e la barra dei titoli della ricerca
            this.filterSearch = '';
            this.titleSearch = testoRicercato;
            axios.get( urlApiKey + "tv/on_the_air" , {
                params:{
                    api_key: myApiKey,
                    // query: testoRicercato
                    query: '',
                    language: 'it',
                }
            })
            // assegno i risultati della chiamata all'array dei FILM e SERIE TV uniti
            .then((reply) => {
                this.arrayMoviesSeries = reply.data.results;
            })
        },

        popularSeries() {
            this.arrayMoviesSeries = [];
            let testoRicercato = this.filterSearch;
            // svuoto l'input e la barra dei titoli della ricerca
            this.filterSearch = '';
            this.titleSearch = testoRicercato;
            axios.get( urlApiKey + "tv/popular" , {
                params:{
                    api_key: myApiKey,
                    // query: testoRicercato
                    query: '',
                    language: 'it',
                }
            })
            // assegno i risultati della chiamata all'array dei FILM e SERIE TV uniti
            .then((reply) => {
                this.arrayMoviesSeries = reply.data.results;
            })
        },

        // funzione per tornare alla HOME PAGE
        returnHomePage() {
            this.arrayMoviesSeries = [];
            let testoRicercato = this.filterSearch;
            // svuoto l'input e la barra dei titoli della ricerca
            this.filterSearch = '';
            this.titleSearch = testoRicercato;
            axios.get( urlApiKey + "movie/top_rated" , {
                params:{
                    api_key: myApiKey,
                    // query: testoRicercato
                    query: '',
                    language: 'it',
                }
            })
            // assegno i risultati della chiamata all'array dei FILM e SERIE TV uniti
            .then((reply) => {
                this.arrayMoviesSeries = reply.data.results;
            })
        // end home page
        },

    //end METHODS
    },

    mounted() {
        // chiamata per recuperare la lista dei FILM più visti da metterecome HOME PAGE
        axios.get( urlApiKey + "movie/top_rated" , {
            params:{
                api_key: myApiKey,
                // query: testoRicercato
                query: '',
                language: [ 'it', 'en' ]
            }
        })
        // assegno i risultati della chiamata all'array dei FILM
        .then((reply) => {
            this.arrayMoviesSeries = reply.data.results;
        })


        axios.get( urlApiKey + "genre/movie/list" , {
            params:{
                api_key: myApiKey,
                // query: testoRicercato
                query: '',
            }
        })
        // assegno i risultati della chiamata all'array dei FILM
        .then((reply) => {

            this.typeGenres = reply.data.genres
            console.log(this.typeGenres);
        })

 // end mounted
    },

// end VUE
});
