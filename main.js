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
        }
    }



// end VUE
});
