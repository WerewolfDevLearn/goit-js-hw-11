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
  totalPics: 0,
  keyword: '',
};

form.submit.addEventListener('click', onSubmit);
buttonLM.addEventListener('click', loadMore);

async function onSubmit(event) {
  event.preventDefault();
  if (!form.query.value) {
    Notify.info('Please enter keyword!');
    return;
  }
  state.keyword = form.query.value;
  console.log(state);
  const data = await getImages(state.keyword, state.page);
  setState(data);
  console.log(state);
  Notify.info(`Hooray! We found ${state.totalPics} images.`);
  gallery.innerHTML = '';
  injectGalleryItem(state.arrOfImages);
  toggleButton();
}
async function loadMore() {
  const data = await getImages(state.keyword, state.page);
  setState(data);
  injectGalleryItem(state.arrOfImages);
  console.log(state);
  toggleButton();
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
  state.page = state.page + 1;
}

function resetState() {
  state.arrOfImages = [];
  state.page = 1;
  state.totalPics = 0;
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
function toggleButton() {
  if (state.page > 1 && state.page * 40 < state.totalPics) {
    buttonLM.classList.remove('button-hidden');
  } else {
    buttonLM.classList.add('button-hidden');
    Notify.info("We're sorry, but you've reached the end of search results.");
  }
}
