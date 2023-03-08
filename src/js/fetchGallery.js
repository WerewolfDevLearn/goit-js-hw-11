import axios from 'axios';
import key from './key';

const URL = `https://pixabay.com/api/?key=${key}&`;

axios.defaults.baseURL = URL;

export function getImages(string, page) {
  return axios
    .get(
      `q=${string}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
    )
    .then(({ data }) => data.hits);
}
