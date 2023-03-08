import { getImages } from './js/fetchGallery';
import { imageCardTmpl } from './js/markupTemplates';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const buttonLM = document.querySelector('[data-action]');
form.submit.addEventListener('click', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  getImages('dog', 1).then(hits => injectGalleryItem(hits));
}

function injectGalleryItem(arr) {
  const markup = arr.map(item => imageCardTmpl(item)).join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
  console.log(lightbox);
  buttonLM.classList.toggle('button-hidden');
}
