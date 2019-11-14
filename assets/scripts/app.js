const startAddMovieButton = document.querySelector('header button');

const entryText = document.getElementById('entry-text');

const movieList = document.getElementById('movie-list');

// const addMovieModal = document.querySelector('#add-modal');

const addMovieModal = document.getElementById('add-modal');

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

const renderNewMovieElement = (title, imageUrl, rating) => {
    const newLi = document.createElement('li');
    newLi.className = 'movie-element';
    
    newLi.innerHTML = `
        <div class='movie-element__image'>
            <img src='${imageUrl}' alt='${title}' />
        </div>
        <div class='movie-element__info'>
            <h2>${title}</h2>
            <p>${rating}/5 stars</p>
        </div>
    
    `;

    movieList.appendChild(newLi);
};

const toggleBackDrop = () => {
    backDrop.classList.toggle('visible');
};

const toggleMovieModal = () => {
    addMovieModal.classList.toggle('visible');

    toggleBackDrop();
};

const cancelAddMovie = () => {
    toggleMovieModal();
    clearMovieInputs();
};

const backDropHandler = () => {
    toggleMovieModal();
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
        title: movieTitle,
        imgUrl: movieImgUrl,
        rate: movieRating
    };

    movies.push(newMovie);

    toggleMovieModal();

    clearMovieInputs();

    renderNewMovieElement(newMovie.title, newMovie.imgUrl, newMovie.rate);

    updateUI();
};

startAddMovieButton.addEventListener('click', toggleMovieModal);

backDrop.addEventListener('click', backDropHandler);

cancelAddMovieButton.addEventListener('click', cancelAddMovie);

confirmAddMovieButton.addEventListener('click', addMovieHandler);