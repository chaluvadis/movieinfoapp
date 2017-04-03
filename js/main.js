$(document).ready(() => {
    getMovieList('');
    $("#searchForm").on('submit', (e) => {
        let searchText = $("#searchText").val();
        getMovieList(searchText);
        e.preventDefault();
    })
});

function getMovieList(searchText) {
    //On load show the movies with Lord search text i like Lord Of the Ring Series
    if(searchText === '') {
        searchText = 'lord'
    }
    axios.get('http://www.omdbapi.com?s=' + searchText)
        .then((response) => {
            let movies = response.data.Search;
            let output = '';
            $.each(movies, (index, movie)=>{
                output += `
                    <div class="col-md-3">
                        <div class="well text-center">
                            <a onclick="movieSelected('${movie.imdbID}')"  href="#">
                                <img src="${movie.Poster}" class="movie-item">
                            </a>
                        </div>
                    </div>
                `;
            });
            $('#movies').html(output);
        })
        .catch((err) => {
            console.log(err);
        })
}

function movieSelected(id) {
    sessionStorage.setItem('movieid', id);
    window.location = 'movie.html';
    return false;
}

function getMovie() {
    let movieId = sessionStorage.getItem('movieid');
    axios.get('http://www.omdbapi.com?i=' + movieId)
        .then((response) => {
            console.log(response);
            let movie = response.data;
            let output = `
                <div class="row">
                    <div class="col-md-4">
                        <img src="${movie.Poster}" class="thumbnail">
                    </div>
                    <div class="col-md-8">
                        <h2>${movie.Title}</h2>
                        <ul class="list-group">
                            <li class="list-group-item">
                                <strong>Genre: </strong>
                                ${movie.Genre}
                            </li>
                            <li class="list-group-item">
                                <strong>Released: </strong>
                                ${movie.Released}
                            </li>
                            <li class="list-group-item">
                                <strong>IMDB Rating: </strong>
                                ${movie.imdbRating}
                            </li>
                            <li class="list-group-item">
                                <strong>Director: </strong>
                                ${movie.Director}
                            </li>
                            <li class="list-group-item">
                                <strong>Writter: </strong>
                                ${movie.Writer}
                            </li>
                            <li class="list-group-item">
                                <strong>Actors: </strong>
                                ${movie.Actors}
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="row">
                    <div class="well">
                        <h3>Plot</h3>
                        ${movie.Plot}
                        <hr>
                        <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
                        <a href="index.html" class="btn btn-default">Go Back to Search</a>
                    </div>
                </div>
            `;
            $('#movie').html(output);
        })
        .catch((err) => {
            console.log(err);
        })
}
