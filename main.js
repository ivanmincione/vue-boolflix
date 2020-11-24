var app = new Vue ({
    el: '#root',
    data: {
        movies:[],
        filterSearch:'',

    },

    methods: {
        btnResearch() {
            axios.get("https://api.themoviedb.org/3/search/movie" , {
                params:{
                    api_key: "2d2a4a44dc798710847157dec0ed05f2",
                    query: this.filterSearch
                }
            })
            .then((reply) => {
                this.movies = reply.data.results;
                this.filterSearch = '';

                console.log(this.movies);
            })
            .then((reply) => {
                this.movies.forEach((movie) => {
                    if(movie.original_language == "en") {
                        movie.original_language = "Flags/engFlag.png";
                    } else if (movie.original_language == "it") {
                        movie.original_language = "Flags/itaFlag.png";
                    } else if (movie.original_language == "fr") {
                        movie.original_language = "Flags/fraFlag.png";
                    } else if (movie.original_language == "es") {
                        movie.original_language = "Flags/spaFlag.png";
                    } else if (movie.original_language == "de") {
                        movie.original_language = "Flags/gerFlag.png";
                    }
                })
            })
            
        }


    //end METHODS
    }



// end VUE
});
