if (!localStorage.getItem('films')) {
  const filmsDBStart = ['The Gentlemen', 'Avatar: The Way of Water', 'Tulsa King', 'American Made'];
  const filmsDBStorage = JSON.stringify(filmsDBStart);
  localStorage.setItem('films', filmsDBStorage);
}

let filmsDB = JSON.parse(localStorage.getItem('films'));

const filmList = document.querySelector('.film-list'),
  noFilmShowText = document.getElementById('noFilm'),
  noFilmFoundText = document.getElementById('noFilmFound'),
  addFilmInput = document.querySelector('.film-add'),
  addFilmBtn = document.querySelector('.film-add-btn'),
  findInput = document.querySelector('.film-find'),
  deleteAllBtn = document.querySelector('.film-delete-all'),
  deleteModal = document.querySelector('.modal-delete-all'),
  btnDelYes = document.getElementById('delAll'),
  btnDelNo = document.getElementById('delNo'),
  body = document.body;

const sortArr = (arr) => {
  arr.sort();
};

function createFilmList() {
  filmList.innerHTML = "";
  sortArr(filmsDB);

  filmsDB.forEach((film, i) => {
    filmList.innerHTML += `
      <li class="film-item">
          ${i + 1}. ${film}
          <div class="film-delete btn">delete</div>
      </li>
    `;
  });

  document.querySelectorAll('.film-delete').forEach((btn, i) => {
    btn.addEventListener('click', () => {
      btn.parentElement.remove();
      filmsDB.splice(i, 1);

      createFilmList();

      let films = JSON.stringify(filmsDB);
      localStorage.setItem('films', films);

      noFilmShow()

      findInput.value = "";
    });
  });
}

function addFilm() {
  if (addFilmInput.value != "") {
    filmsDB.push(addFilmInput.value);

    createFilmList();

    addFilmInput.value = "";

    let films = JSON.stringify(filmsDB);
    localStorage.setItem('films', films);

    noFilmShow();
  }
}

function noFilmShow() {
  if (filmsDB.length === 0) {
    noFilmShowText.classList.add('film-find-show');
  } else {
    noFilmShowText.classList.remove('film-find-show');
  }
}

createFilmList();
noFilmShow()

addFilmInput.addEventListener('input', () => {
  addFilmBtn.addEventListener('click', () => {
    addFilm();
  });
});

addFilmInput.addEventListener('keydown', (e) => {
  if (e.keyCode === 13) {
    addFilm();
  }
});

findInput.addEventListener('input', () => {
  let value = findInput.value.trim().toUpperCase();
  let filmCounter = 0;

  const filmsList = document.querySelectorAll('.film-item');

  if (value) {
    filmsList.forEach(film => {
      if (film.innerText.toUpperCase().search(value) == -1) {
        film.classList.add('hide');
      } else {
        film.classList.remove('hide');
      }

      if (!film.classList.contains('hide')) {
        filmCounter++;
      }
    });
  }

  if (!noFilmShowText.classList.contains('film-find-show')) {
    if (filmCounter == 0) {
      noFilmFoundText.classList.add('film-find-show');
    } else {
      noFilmFoundText.classList.remove('film-find-show');
    }
  }

  if (!value) {
    filmsList.forEach(film => {
      film.classList.remove('hide');
      noFilmFoundText.classList.remove('film-find-show');
    });
  }
});

deleteAllBtn.addEventListener('click', () => {
  if (filmsDB.length > 0) {
    deleteModal.classList.add('modal-open');
    body.classList.add('lock');
  }
});

btnDelNo.addEventListener('click', () => {
  deleteModal.classList.remove('modal-open');
  body.classList.remove('lock');
});

deleteModal.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-delete-body')) {
    deleteModal.classList.remove('modal-open');
    body.classList.remove('lock');
  }
});

btnDelYes.addEventListener('click', () => {
  deleteModal.classList.remove('modal-open');
  body.classList.remove('lock');

  document.querySelectorAll('.film-delete').forEach(btn => {
    btn.parentElement.remove();
    filmsDB.splice(0, filmsDB.length);

    createFilmList();

    films = JSON.stringify(filmsDB);
    localStorage.setItem('films', films);

    noFilmShow();

    findInput.value = "";
  });
});