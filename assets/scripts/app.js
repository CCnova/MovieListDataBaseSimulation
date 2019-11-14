const startAddMovieButton = document.querySelector('header button');

const entryText = document.getElementById('entry-text');

const movieList = document.getElementById('movie-list');

// const addMovieModal = document.querySelector('#add-modal');

const addMovieModal = document.getElementById('add-modal');

const deleteMovieModal = document.getElementById('delete-modal');

const backDrop = document.getElementById('backdrop');

const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');

const confirmAddMovieButton = addMovieModal.querySelector('.btn--success');

const modalInputContentDiv = addMovieModal.querySelector('.modal__content');

const movieTitleInput = modalInputContentDiv.querySelector('#title');

const movieImageURLInput = modalInputContentDiv.querySelector('#image-url');

const movieRatingInput = modalInputContentDiv.querySelector('#rating');

const userInputs = modalInputContentDiv.querySelectorAll('input');

const movies = [];

const updateUI = () => {
    if (movies.length === 0) {
        entryText.style.display = 'block';
    } else {
        entryText.style.display = 'none';
    }
};

const closeMovieDeletionModal = () => {
    toggleBackDrop();
    deleteMovieModal.classList.remove('visible');
};

const deleteMovieHandler = (movieId) => {
    let movieIndex = 0;
    for (const movie of movies) {
        if (movie.id === movieId) {
            break;
        }
        movieIndex++;
    }

    movies.splice(movieIndex, 1);
    movieList.children[movieIndex].remove();

    closeMovieDeletionModal();
    updateUI();
};



const startDeleteMovieHandler = (movieId) => {
    deleteMovieModal.classList.add('visible');
    toggleBackDrop();

    const cancelDeleteButton = deleteMovieModal.querySelector('.modal__actions .btn--passive');
    
    let confirmDeleteButton = deleteMovieModal.querySelector('.modal__actions .btn--danger');

    confirmDeleteButton.replaceWith(confirmDeleteButton.cloneNode(true));
    confirmDeleteButton = deleteMovieModal.querySelector('.modal__actions .btn--danger');


    cancelDeleteButton.removeEventListener('click', closeMovieDeletionModal);
    
    confirmDeleteButton.addEventListener('click', deleteMovieHandler.bind(null, movieId));
    cancelDeleteButton.addEventListener('click', closeMovieDeletionModal);

};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    
    newMovieElement.innerHTML = `
        <div class='movie-element__image'>
            <img src='${imageUrl}' alt='${title}' />
        </div>
        <div class='movie-element__info'>
            <h2>${title}</h2>
            <p>${rating}/5 stars</p>
        </div>
    
    `;

    newMovieElement.addEventListener('click', startDeleteMovieHandler.bind(null, id));

    movieList.appendChild(newMovieElement);
};

const toggleBackDrop = () => {
    backDrop.classList.toggle('visible');
};

const closeMovieModal = () => {

    addMovieModal.classList.remove('visible');
}; 

const showMovieModal = () => {
    toggleBackDrop();
    addMovieModal.classList.add('visible');
};

const cancelAddMovie = () => {
    closeMovieModal();
    toggleBackDrop();
    clearMovieInputs();
};

const backDropHandler = () => {
    closeMovieModal();
    closeMovieDeletionModal();
    clearMovieInputs();
};


const clearMovieInputs = () => {
    for (const usrInput of userInputs) {
        usrInput.value = '';
    }
};

const addMovieHandler = () => {
    const movieTitle = userInputs[0].value;
    const movieImgUrl = userInputs[1].value;
    const movieRating = userInputs[2].value;

    if (movieTitle.trim() === '' || movieImgUrl.trim() === '' || movieRating.trim() == '' || parseInt(movieRating) < 1 && parseInt(movieRating) > 5) {
        alert('Please enter valid values (rate between 1 and 5)');
        return;
    }


    const newMovie = {
        id: Math.random().toString(),
        title: movieTitle,
        imgUrl: movieImgUrl,
        rate: movieRating
    };

    movies.push(newMovie);

    closeMovieModal();

    toggleBackDrop();

    clearMovieInputs();

    renderNewMovieElement(newMovie.id,newMovie.title, newMovie.imgUrl, newMovie.rate);

    updateUI();
};

startAddMovieButton.addEventListener('click', showMovieModal);

backDrop.addEventListener('click', backDropHandler);

cancelAddMovieButton.addEventListener('click', cancelAddMovie);

confirmAddMovieButton.addEventListener('click', addMovieHandler);