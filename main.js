const urlApiKey = "https://api.themoviedb.org/3/";
const myApiKey = "2d2a4a44dc798710847157dec0ed05f2";

var app = new Vue ({
    el: '#root',
    data: {
        // array contenente i film ricercati
        movies: [],
        // array contenente le SERIE TV ricercate
        series: [],
        // array dove concatenare i FILM e le SERIE TV
        arrayMoviesSeries: [],
        // input search
        filterSearch:'',
        // array delle lingue abbinate alle FLAGS
        languageFlag: ['it', 'en', 'es', 'fr', 'de'],
        // variabile per il loading
        loading: false,
        // titolo della ricerca effettuata
        titleSearch:'',
        // url base da concatenare con url di ogni box
        urlPoster: "https://image.tmdb.org/t/p/",
        // url da inserire nel caso il poster di un film sia NULL
        urlNullPoster: "https://www.softwareone.it/public/layout/uploads/2019/05/movavi-video-editor-icona.png",

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
                        query: testoRicercato
                    }
                })
                // assegno i risultati della chiamata all'array dei FILM
                .then((reply) => {
                    this.movies = reply.data.results;
                })

                // chiamata per recuperare la lista delle SERIE TV
                axios.get( urlApiKey + "search/tv" , {
                    params:{
                        api_key: myApiKey,
                        query: testoRicercato
                    }
                })
                // assegno i risulati ottenuti dalla chiamata all'array SERIE TV
                .then((reply) => {
                    this.series = reply.data.results;
    //-----------> // this.filterSearch = '';
                    // unisco gli array dei FILM e delle SERIE TV
                    this.arrayMoviesSeries = this.movies.concat(this.series);
                    this.loading = false;
                })
            // end if
            }


        },

        // arrotondo il numero del voto
        votation(val) {
            var number = Math.round(parseFloat(val) / 2 );
            return number
        },


    //end METHODS
    }



// end VUE
});
