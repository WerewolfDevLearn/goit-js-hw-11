import { getImages } from './js/fetchGallery';
import { imageCardTmpl } from './js/markupTemplates';
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const buttonLM = document.querySelector('[data-action]');
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
const state = {
  arrOfImages: [],
  page: 1,
  prePage: 40,
  totalPics: 0,
  keyword: '',
  isLastPage: false,
};
console.log('intialState', state);

form.submit.addEventListener('click', onSubmit);
buttonLM.addEventListener('click', loadMore);

async function onSubmit(event) {
  event.preventDefault();
  if (!form.query.value) {
    Notify.info('Please enter keyword!');
    return;
  }
  console.log('keyword and queryword', state.keyword === form.query.value);
  if (state.keyword === form.query.value) {
    Notify.info('Please enter new keyword!');
    return;
  }
  console.log(state.page);
  buttonLM.classList.add('button-hidden');
  state.keyword = form.query.value;
  gallery.innerHTML = '';
  state.page = 1;
  const data = await getImages(state.keyword, state.page, state.prePage);
  setState(data);
  Notify.info(`Hooray! We found ${state.totalPics} images.`);
  injectGalleryItem(state.arrOfImages);
}
async function loadMore() {
  console.log(state.page);
  const data = await getImages(state.keyword, state.page, state.prePage);
  setState(data);
  injectGalleryItem(state.arrOfImages);
}

function setState(data) {
  if (data.hits.length === 0) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  state.arrOfImages = [];
  state.arrOfImages = [...data.hits];
  state.totalPics = data.totalHits;

  isLastPage();
  toggleButton(state.isLastPage);
  state.page = state.page + 1;
}

function injectGalleryItem(arr) {
  const markup = arr.map(item => imageCardTmpl(item)).join('');
  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth',
  });
}
function isLastPage() {
  const dif = state.totalPics - state.page * state.prePage;
  if (dif <= 0) {
    state.isLastPage = true;
  } else {
    state.isLastPage = false;
  }
  console.log('lastPage', state.isLastPage);
}

function toggleButton(bulleon) {
  if (bulleon) {
    buttonLM.classList.add('button-hidden');
    Notify.info("We're sorry,but you've reached the end of search results.");
  } else {
    buttonLM.classList.remove('button-hidden');
  }
}
