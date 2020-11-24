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

    },

    methods: {
        // funzione abbianta al bottone per la ricerca
        btnResearch() {
            // chiamata per recuperare la lista dei FILM
            axios.get("https://api.themoviedb.org/3/search/movie" , {
                params:{
                    api_key: "2d2a4a44dc798710847157dec0ed05f2",
                    query: this.filterSearch
                }
            })
            // assegno i risultati della chiamata all'array dei FILM
            .then((reply) => {
                this.movies = reply.data.results;
                this.filterSearch = '';
            })

            // chiamata per recuperare la lista delle SERIE TV
            axios.get("https://api.themoviedb.org/3/search/tv" , {
                params:{
                    api_key: "2d2a4a44dc798710847157dec0ed05f2",
                    query: this.filterSearch
                }
            })
            // assegno i risulati ottenuti dalla chiamata all'array SERIE TV
            .then((reply) => {
                this.series = reply.data.results;
                this.filterSearch = '';
                // unisco gli array dei FILM e delle SERIE TV
                this.arrayMoviesSeries = this.movies.concat(this.series);
            })

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
